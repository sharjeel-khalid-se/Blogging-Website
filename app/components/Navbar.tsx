import{ getUserSession } from "@/lib/session";
import Link from "next/link";

const Navbar = async () => {

const session = await getUserSession()
  return (
    <nav className="flex items-center bg-white w-full justify-between px-10 py-4 border-b border-gray-300 fixed top-0 left-0 z-10">
      <h1 className="text-3xl font-bold text-indigo-400">Blog</h1>
      <ul className="flex items-center justify-center gap-2.5">
        {session ? (
          <li className="bg-indigo-400 text-white py-3 px-6 rounded hover:bg-white hover:text-indigo-400 hover:border-indigo-400 border transition hover:scale-110 hover:cursor-pointer font-medium ">New Post</li>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <Link href="/login" className="bg-indigo-400 text-white py-3 px-6 rounded hover:bg-white hover:text-indigo-400 hover:border-indigo-400 border transition hover:scale-110 hover:cursor-pointer font-medium ">
              Login
            </Link>
            <Link href="/signup" className="bg-indigo-400 text-white py-3 px-6 rounded hover:bg-white hover:text-indigo-400 hover:border-indigo-400 border transition hover:scale-110 hover:cursor-pointer font-medium ">
              Register
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
