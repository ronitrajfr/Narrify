import { useState } from "react";
import { Nav } from "../components/Nav.tsx";

export const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit() {
    console.log(title, text);
  }

  return (
    <div className="bg-[#171717]">
      <div>
        <Nav />
      </div>
      <div className="text-text p-4 pt-[250px] flex justify-center items-center border-t space-y-4 border-action rounded-md bg-[#171717]">
        <div className="h-[550px] w-[417px] sm:h-[550px] sm:w-[417px] md:h-[600px] md:w-[537px]">
          <div className="text-2xl text-action font-bold">Create New Post</div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col">
              <div className="py-1">
                <input
                  placeholder="Title"
                  className="outline-none border border-[rgba(255,0,0,0.5)]border-2 rounded px-2 py-0.5 bg-secondary w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="py-1">
                <textarea
                  placeholder="Text"
                  className="resize-none outline-none border rounded border-[rgba(255,0,0,0.5)] px-2 py-0.5 bg-secondary w-full"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-action/90 bg-action/10 rounded border border-action/50 w-full my-1 px-4 py-1"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
