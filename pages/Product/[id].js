import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "@/components/ProductContextProvider";

const Product = function ({ product }) {
  const [qty, setQty] = useState(1);
  const { session, addToCart, cartNumber } = useContext(ProductContext);

  useEffect(() => {
    if (session) {
      cartNumber();
    }
  }, [session]);

  const ratings = function (rating) {
    let rate = [];
    const singleRate = rating[0];
    for (let i = 1; i <= singleRate; i++) {
      rate.push("★");
    }
    return rate;
  };

  const addToCartWithQty = function (data) {
    const dataWithQty = { ...data, qty };
    console.log(dataWithQty);
    return addToCart(dataWithQty);
  };

  return (
    <main className=" grid md:grid-cols-2  gap-5 lg:mx-32  my-10 p-10">
      <section className=" text-center">
        <div className="p-7 border-2  rounded-md">
          <Image
            src={product.image}
            width={300}
            height={300}
            alt="Product Photo"
            className="mx-auto  overflow-auto"
          />
        </div>
        <p className="my-5 font-semibold">{product.description}.</p>
      </section>

      <section className="bg-white p-9">
        <p className="text-right italic opacity-80 mb-4">
          {product.category.toUpperCase()}
        </p>
        <h1 className="text-3xl">{product.title}</h1>
        <h2 className="my-2">ID: {product.id}</h2>
        <h2 className="my-3 text-xl font-bold">$ {product.price}</h2>
        <h2 className="mb-5 text-base">
          Reviews ({product.rating.count}){" "}
          {ratings(product.rating.rate.toString())}
        </h2>
        <div className="my-5">
          <h3 className="text-lg">Quantity</h3>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border-2 w-20 px-2 py-1"
            type="number"
            min="1"
          />
        </div>
        <button
          onClick={() => addToCartWithQty(product)}
          className="border-black border-2 py-3 rounded-md hover:bg-black hover:text-white ease-in duration-200 w-full"
        >
          {session ? "Add to cart" : "Log in to continue"}
        </button>
        <h2></h2>
      </section>
    </main>
  );
};

export default Product;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
