import { useContext, useEffect } from "react";
import { ProductContext } from "@/components/ProductContextProvider";
import Image from "next/image";

const Cart = function () {
  const { productCart, cartNumber, session } = useContext(ProductContext);
  useEffect(() => {
    if (session) {
      cartNumber();
    }
  }, [session]);

  return (
    <main className="grid grid-cols-3 h-auto p-20 bg-red-500 gap-5">
      <section className="col-span-2 bg-slate-700">
        {productCart.map((product) => {
          return (
            <div className=" bg-white h-52 m-5">
              <Image
                src={product.image}
                width={20}
                height={20}
                // alt={product.title}
              />
            </div>
          );
        })}
      </section>
      <section className="bg-white"></section>
    </main>
  );
};

export default Cart;
