import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { cors } from "hono/cors";
import {
  signinInput,
  signupInput,
  blogInput,
  updateInput,
} from "@ronitraj/narrify-common";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
app.use("/*", cors());

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ err: "invalid input" });
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (isUserExists) {
    return c.text("user with this email already exists");
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    return c.json({ error });
  }
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ err: "invalid input" });
  }
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!findUser) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({ id: findUser.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    c.json({ error });
  }
});

app.get("/api/v1/blog/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(posts); // Sending 'posts' instead of 'findPost'
});

app.post("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = blogInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ err: "invalid input" });
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ id: newPost.id });
  } catch (error) {
    return c.json({ error });
  }
});

app.put("/api/v1/blog", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ err: "invalid input" });
  }
  const updatePost = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ msg: "post updated successfully" });
});

app.get("/api/v1/blog/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const findPost = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return c.json({ findPost });
});

export default app;
