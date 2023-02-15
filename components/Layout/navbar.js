import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const Navbar = function () {
  const [active, setActive] = useState(false);

  const navHandler = function () {
    return setActive(!active);
  };

  return (
    <header>
      <div className="bg-neutral-900 p-2">
        <p className="text-white text-sm opacity-90">
          Caution: Nothing on this website is for sale. It is only for
          educational purposes.
        </p>
      </div>
      <nav className="bg-white flex justify-between p-5 drop-shadow-lg">
        <div className="flex flex-col">
          <span className="text-2xl lg:text-4xl font-bold">Arcane</span>
          <span className="text-base lg:text-lg font-bold">
            Shop all you want.
          </span>
        </div>
        {/* Wide Screen */}
        <ul className="hidden md:flex gap-10">
          <li className="nav-category">
            <Link href="/">Electronics</Link>
          </li>
          <li className="nav-category">
            <Link href="/">Jewelery</Link>
          </li>
          <li className="nav-category">
            <Link href="/">Men&apos;s Clothing</Link>
          </li>
          <li className="nav-category">
            <Link href="/">Women&apos;s Clothing</Link>
          </li>
        </ul>
        <ul className="hidden lg:flex gap-5">
          <li className="self-center text-lg">
            <Link
              href="/"
              className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
            >
              <AiOutlineShoppingCart size={25} />
              Your Cart
            </Link>
          </li>
          <li className="self-center text-lg">
            <Link
              href="/"
              className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
            >
              <BsPersonCircle size={25} />
              <span>Login</span>
            </Link>
          </li>
        </ul>

        {/* Mobile */}
        <div className="flex gap-5 lg:hidden">
          <FiMenu onClick={navHandler} size={30} className="block lg:hidden" />
          <div className={`${active ? " flex flex-col-reverse " : "hidden"}`}>
            <ul className="block md:hidden">
              <li className="nav-category">
                <Link href="/">Electronics</Link>
              </li>
              <li className="nav-category">
                <Link href="/">Jewelery</Link>
              </li>
              <li className="nav-category">
                <Link href="/">Men&apos;s Clothing</Link>
              </li>
              <li className="nav-category">
                <Link href="/">Women&apos;s Clothing</Link>
              </li>
            </ul>
            <ul className="block lg:hidden w-40 ">
              <li className="self-center text-lg">
                <Link
                  href="/"
                  className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
                >
                  <AiOutlineShoppingCart size={25} />
                  Your Cart
                </Link>
              </li>
              <li className="self-center text-lg">
                <Link
                  href="/"
                  className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
                >
                  <BsPersonCircle size={25} />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
