import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ProductContext } from "./ProductContextProvider";

const ProductCard = function ({ products }) {
  const ratings = function (rating) {
    let rate = [];
    const singleRate = rating[0];
    for (let i = 1; i <= singleRate; i++) {
      rate.push("★");
    }
    return rate;
  };

  const { session, addToCart } = useContext(ProductContext);

  return (
    <>
      {products.map((data) => {
        return (
          <div key={data.id} className={`border  px-5 py-5 rounded-xl`}>
            {data.rating.rate.toString()[0] >= 3 ? (
              <span className="text-white shrink inline-block bg-black px-2 py-1 my-3 rounded-md">
                Top sellers
              </span>
            ) : (
              ""
            )}
            <div className=" flex flex-col h-96 text-center gap-3  ">
              <Image
                src={data.image}
                className="mx-auto w-auto h-auto overflow-auto cursor-pointer hover:scale-110 ease-in-out duration-500"
                width={180}
                height={180}
                alt="product"
                priority={true}
              />
              <Link className="hover:underline" href={`/Product/${data.id}`}>
                {data.title}
              </Link>
              <h5 className="text-sm">
                {ratings(data.rating.rate.toString())} ({data.rating.count})
              </h5>
              <h6>$ {data.price}</h6>
              <div>
                <button
                  onClick={() => addToCart(data)}
                  className="border-black border-2 px-3 py-1 rounded-md hover:bg-black hover:text-white ease-in duration-200 "
                >
                  {session ? "Add to cart" : "Log in to continue"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
