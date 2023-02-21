import { BsCheck2Circle } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/components/ProductContextProvider";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "@/firebaseConfig";

const Success = function () {
  const {
    productCart,
    session,
    fetchProductCart,
    fetchProductPurchased,
    updateCart,
    purchasedProduct,
  } = useContext(ProductContext);

  useEffect(() => {
    if (!session) return;
    updateCart();
    fetchProductCart();
    fetchProductPurchased();
  }, [session]);

  return (
    <main className=" text-center py-20">
      <BsCheck2Circle size={45} className="font-bold mx-auto mb-5" />
      <h1 className="text-3xl font-bold tracking-widest">PAYMENT SUCCESSFUL</h1>
      <p className="leading-6 mt-3">
        Thank you for choosing Arcane <br />
        Your can view your purchase history in My Account page.
      </p>
      <button className=" my-5 text-xl bg-black text-white py-2 rounded-sm px-3">
        Continue Shopping
      </button>
    </main>
  );
};

export default Success;
