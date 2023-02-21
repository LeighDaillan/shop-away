import { useContext, useEffect } from "react";
import { ProductContext } from "@/components/ProductContextProvider";
import Image from "next/image";

const Account = function () {
  const { fetchProductPurchased, purchasedProduct, session } =
    useContext(ProductContext);

  useEffect(() => {
    fetchProductPurchased();
  }, [session]);

  return (
    <main>
      <h1 className="text-4xl font-bold mt-16 ml-10">History</h1>

      <div className="grid md:grid-cols-2 gap-3 mx-10 mb-10">
        {purchasedProduct.map((product) => {
          return (
            <div
              key={product.firebase_id}
              className="flex bg-white h-48 md:m-5 "
            >
              <div className="self-center">
                <Image
                  className=""
                  src={product.image}
                  width={130}
                  height={130}
                  alt={product.title}
                />
              </div>
              <div className="mx-2 md:mx-10 mt-5 max-w-xs">
                <h1 className="mt-5 text-xs sm:text-sm md:text-lg lg:text-xl font-semibold ">
                  {product.title}
                </h1>
                <p className="text-xs lg:text-sm">ID: {product.firebase_id}</p>
                <p className="text-xs font-bold mt-3 md:text-lg">
                  Price: ${product.price}
                </p>
                <p className="text-xs font-bold md:text-base">
                  QTY: {product.qty}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Account;
