import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/components/ProductContextProvider";
import Image from "next/image";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { HiOutlineTrash } from "react-icons/hi";

const Cart = function () {
  const {
    productCart,
    fetchProductCart,
    session,
    productCount,
    productSubTotal,
    setProductCount,
    setProductSubTotal,
    removeProduct,
    notif,
  } = useContext(ProductContext);

  const shortDescription = function (description) {
    const maxLength = 150;

    let trimmedString = description.substr(0, maxLength);

    return (trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    ));
  };

  return (
    <>
      {/* Remove Item Banner */}
      {notif && (
        <div className={`bg-green-600 text-center rounded-b-md  w-48 mx-auto `}>
          <span className="text-white">Remove item</span>
        </div>
      )}
      <main className="lg:grid lg:grid-cols-3 p-5 md:p-20 gap-5">
        <section className="md:col-span-2 ">
          {productCart.map((product) => {
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
                  <p className="text-xs lg:text-sm">
                    ID: {product.firebase_id}
                  </p>
                  <p className="text-xs font-bold mt-3 md:text-lg">
                    Price: ${product.price}
                  </p>
                  <p className="text-xs font-bold md:text-base">
                    QTY: {product.qty}
                  </p>
                </div>

                <div className="self-center text-right flex-1 w-full">
                  <button onClick={() => removeProduct(product)}>
                    <HiOutlineTrash size={30} />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        <section className="mt-5">
          <div className="grid grid-cols-2">
            <h1 className="opacity-70">Order Items:</h1>
            <p className="justify-self-end text-sm">{productCount}</p>
            <h1 className="opacity-70">Order Value:</h1>
            <p className="justify-self-end text-sm">$ {productSubTotal}</p>
            <h1 className="opacity-70">Shipping:</h1>
            <p className="justify-self-end text-sm">Upon checking out</p>
            <p className="border-b-2 border-black col-span-2 my-2"></p>
            <h3 className="font-bold">Total</h3>
            <p className="justify-self-end font-bold">$ {productSubTotal}</p>
            <button className="col-span-2 bg-black text-white py-3 my-7">
              Continue to checkout
            </button>
            <p className="col-span-2 opacity-70 text-xs tracking-wider">
              The estimated tax will be confirmed once you added your shipping
              address in checkout.
              <br />
              <br />
              30-day returns. Read more about our{" "}
              <span className="underline">return and refund policy</span>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cart;
