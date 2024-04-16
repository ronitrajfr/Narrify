import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config.ts";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const Home = () => {
  const [data, setData] = useState<Blog[]>([]);
  useEffect(() => {
    async function getBlogs() {
      const res = await axios.get("http://localhost:8787/api/v1/blog/bulk", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
      console.log(res.data);
    }
    getBlogs();
  }, []);

  return (
    <div className="bg-[#171717]">
      <nav className="flex justify-between py-4  px-10">
        <div>
          <h1 className="text-3xl  text-[#E2E8F0]">Medium</h1>
        </div>
        <div>
          <Link
            className="m-4 text-white hover:underline hover:transition-all"
            to={"/create"}
          >
            Create Blog
          </Link>
          <button className="px-8 py-2 rounded bg-[#E2E8F0]">Logout</button>
        </div>
      </nav>
      <hr className="mb-7" />
      <div className="min-h-screen">
        {data &&
          data.map((item) => {
            return (
              <Card
                title={item.title}
                id={item.id}
                content={item.content}
                author={item.author.name}
              />
            );
          })}
      </div>
    </div>
  );
};

interface Props {
  title: string;
  author: string;
  id: string;
  content: string;
}
function Card({ title, author, id, content }: Props) {
  // Truncate content if it's longer than 100 characters
  const truncatedContent =
    content.length > 100 ? content.substring(0, 100) + "..." : content;

  return (
    <div key={id} className="flex justify-center items-center pt-5">
      <div>
        <h5 className="text-sm text-[#E2E8F0] mb-3">
          Author &#x2022; {author}
        </h5>
        <h1 className="text-xl font-bold  text-[#E2E8F0] mb-3 sm:text-xl md:text-2xl">
          {title}
        </h1>
        <h5 className="text-[#E2E8F0] text-lg font-medium">
          {truncatedContent}
        </h5>
        <hr className="w-[640px]" />
      </div>
    </div>
  );
}
