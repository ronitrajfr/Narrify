import axios from "axios";
import { useState } from "react"; // Added import for useState
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    try {
      const res = await axios.post(`http://localhost:8787/api/v1/user/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#171717] h-screen flex items-center justify-center">
      <div className="bg-black h-[550px] w-[417px] sm:h-[550px] sm:w-[417px] md:h-[600px] md:w-[537px] rounded-2xl">
        <div className="flex justify-center">
          <h1 className="text-white input-heading mt-24 text-4xl">
            Login to continue
          </h1>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
            className="border mt-10 w-2/3 rounded border-slate-400 text-white bg-[#171717] p-3"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password"
            className="border mt-10 w-2/3 rounded border-slate-400 text-white bg-[#171717] p-3"
          />
          <button
            onClick={handleClick}
            className="px-20 rounded-full py-3 mt-10 font-semibold bg-white text-[#171717]"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center mt-10 ">
          <h5 className="text-[#71767B]">
            Don't have an account?{" "}
            <a className="text-white bottomAuth" href="/signup">
              Sign Up
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};
