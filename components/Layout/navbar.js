import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { ProductContext } from "../ProductContextProvider";
import { RiAccountCircleLine } from "react-icons/ri";

const Navbar = function () {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const {
    session,
    setProductCount,
    productCount,
    productCart,
    setProductSubTotal,
    fetchProductCart,
    fetchProductPurchased,
    updateCart,
  } = useContext(ProductContext);

  useEffect(() => {
    if (productCart.length !== 0) {
      setProductCount(
        productCart
          ?.map((product) => product.qty)
          ?.reduce((preVal, curVal) => preVal + curVal)
      );

      setProductSubTotal(
        productCart
          ?.map((product) => product.qty * product.price)
          ?.reduce((preVal, curVal) => preVal + curVal)
          .toFixed(2)
      );
    } else {
      setProductCount(0);
      setProductSubTotal("00.00");
    }
  }, [productCart]);

  useEffect(() => {
    fetchProductCart();
  }, [session]);

  const navHandler = function () {
    return setActive(!active);
  };

  return (
    <header className="">
      <div className="bg-neutral-900 p-2">
        <p className="hidden sm:block text-white text-sm opacity-90">
          Caution: Nothing on this website is for sale. It is for educational
          purposes only.
        </p>
      </div>
      <nav className="bg-white md:flex px-10 md:justify-between p-5 drop-shadow-lg">
        <div
          onClick={() => router.push("/")}
          className="flex flex-col cursor-pointer"
        >
          <span className="text-2xl lg:text-4xl font-bold">Arcane</span>
          <span className="text-base lg:text-lg font-bold">
            Shop all you want.
          </span>
        </div>
        {/* Wide Screen */}
        <ul className="hidden md:flex gap-10">
          <li className="nav-category">
            <Link href="/Electronics">Electronics</Link>
          </li>
          <li className="nav-category">
            <Link href="/Jewelery">Jewelery</Link>
          </li>
          <li className="nav-category">
            <Link href="/MensClothing">Men&apos;s Clothing</Link>
          </li>
          <li className="nav-category">
            <Link href="/WomensClothing">Women&apos;s Clothing</Link>
          </li>
        </ul>
        <ul className="hidden lg:flex gap-5">
          <li className="self-center text-lg">
            <Link
              href="/Cart"
              className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
            >
              <div className="relative mr-1">
                <sup className="bg-black left-5 absolute text-xs text-white rounded-full px-1.5 py-0.5 ">
                  {productCount}
                </sup>
                <AiOutlineShoppingCart size={30} />
              </div>
              Your Cart
            </Link>
          </li>
          <li className="self-center text-lg">
            <Link
              href="/Account"
              className="flex  gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
            >
              <RiAccountCircleLine className="self-center" size={25} />
              <span>My Account</span>
            </Link>
          </li>
          <li className="self-center text-lg">
            {!session ? (
              <Link
                href="/login"
                className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
              >
                <BiLogIn size={25} />
                <span>Login</span>
              </Link>
            ) : (
              <div
                onClick={() => signOut()}
                className="flex cursor-pointer gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
              >
                <BiLogOut size={25} />
                <span className="self-center">Log Out</span>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile */}
        <div className="flex pt-10 sm:pt-0 justify-end gap-5 lg:hidden">
          <FiMenu onClick={navHandler} size={30} className="block lg:hidden" />
          <div className={`${active ? " flex flex-col-reverse " : "hidden"}`}>
            <ul className="block md:hidden">
              <li className="nav-category">
                <Link href="/Electronics">Electronics</Link>
              </li>
              <li className="nav-category">
                <Link href="/Jewelery">Jewelery</Link>
              </li>
              <li className="nav-category">
                <Link href="/MensClothing">Men&apos;s Clothing</Link>
              </li>
              <li className="nav-category">
                <Link href="/WomensClothing">Women&apos;s Clothing</Link>
              </li>
            </ul>
            <ul className="block lg:hidden w-40 ">
              <li className="self-center text-lg">
                <Link
                  href="/Cart"
                  className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
                >
                  <div className="relative mr-1">
                    <sup className="bg-black left-5 absolute text-xs text-white rounded-full px-1.5 py-0.5 ">
                      {productCount}
                    </sup>
                    <AiOutlineShoppingCart size={30} />
                  </div>
                  Your Cart
                </Link>
              </li>
              <li className="self-center text-lg">
                <Link
                  href="/Account"
                  className="flex  gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
                >
                  <RiAccountCircleLine className="self-center" size={25} />
                  <span>My Account</span>
                </Link>
              </li>
              <li className="self-center text-lg">
                {!session ? (
                  <Link
                    href="/login"
                    className="flex gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
                  >
                    <BiLogIn size={25} />
                    <span>Login</span>
                  </Link>
                ) : (
                  <div
                    onClick={() => signOut()}
                    className="flex cursor-pointer gap-2 py-1 hover:border-b-2 hover:border-black ease-in duration-100"
                  >
                    <BiLogOut size={25} />
                    <span className="self-center">Log Out</span>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
