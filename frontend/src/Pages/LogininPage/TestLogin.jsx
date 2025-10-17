import { useState } from "react";
import { login } from "../../service/userService";
import { useNavigate } from "react-router-dom";

const TestLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendLogin = async () => {
    const res = await login(email.trim(), password);
    if (res.success) {
      navigate("/map");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 justify-center flex items-center">
      <div className="h-100 aspect-square flex flex-col items-center bg-white gap-3 p-20">
        <h1 className="text-3xl mb-3">Login</h1>
        <input
          type="text"
          placeholder="email"
          value={email}
          className="text-md text-black border-1 border-gray-600 p-2 w-full"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          className="text-md text-black border-1 border-gray-600 p-2 w-full"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="py-4 w-full bg-blue-400 hover:bg-blue-500 text-white text-md cursor-pointer"
          onClick={sendLogin}
        >
          Login
        </button>
        {/* <button className="py-4 w-full bg-blue-400 hover:bg-blue-500 text-white text-md cursor-pointer" onClick={sendLogin}>
          Signup
        </button> */}
        <div className="text-end w-full">
          <span className="border-b-1 cursor-pointer hover:text-red-500">signup</span>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
