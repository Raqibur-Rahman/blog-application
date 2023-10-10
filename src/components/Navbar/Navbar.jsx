import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-500   backdrop-blur-lg  p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div><Link href={"/"} className="text-white font-bold text-xl">My Blog</Link></div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog/add-blog" className="text-white hover:underline">
               Add Blog
              </Link>
            </li>
    
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
