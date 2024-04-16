import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <nav className="flex justify-between py-4 bg-[#171717] text-white  px-10">
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
          <button className="px-8 py-2 rounded bg-[#838e9c]">Logout</button>
        </div>
      </nav>
    </div>
  );
};
