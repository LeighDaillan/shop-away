import { useState, createContext } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { database } from "@/firebaseConfig";

export const ProductContext = createContext();

const ProductProvider = function (props) {
  const { data: session } = useSession();
  const [productCart, setProductCart] = useState([]);
  const [productCount, setProductCount] = useState();
  const [productSubTotal, setProductSubTotal] = useState("00.00");

  const fetchProductCart = async function () {
    if (!session) return;

    const usersCollectionRef = collection(database, session?.user?.email);
    const q = query(usersCollectionRef, where("status", "==", "cart"));

    const querySnapshot = await getDocs(q);
    setProductCart(
      querySnapshot.docs.map((doc) => {
        return { ...doc.data(), firebase_id: doc.id };
      })
    );
  };

  // Add To Cart Handler
  const addToCart = async function (data) {
    //Guard Clause
    if (!session) return;

    const isInCart = productCart.find((cartData) => cartData.id === data.id);
    // If is in cart and no qty
    if (isInCart && !("qty" in data)) {
      const cartRef = doc(database, session.user.email, isInCart.firebase_id);
      await updateDoc(cartRef, { ...isInCart, qty: +isInCart.qty + 1 });

      // If is in cart and with qty
    } else if (isInCart && "qty" in data) {
      const cartRef = doc(database, session.user.email, isInCart.firebase_id);
      await updateDoc(cartRef, {
        ...isInCart,
        qty: +isInCart.qty + +data.qty,
      });

      // If not in cart and with qty
    } else if (!isInCart && "qty" in data) {
      const cartRef = collection(database, session.user.email);
      const dataCart = { ...data, status: "cart" };
      const document = await addDoc(cartRef, dataCart);

      // if not in cart and no qty
    } else {
      const cartRef = collection(database, session.user.email);
      const dataCart = { ...data, status: "cart", qty: 1 };
      const document = await addDoc(cartRef, dataCart);
    }
    fetchProductCart();
    alert("Added to your cart");
    setTimeout(() => {
      console.log(productCart);
    }, 3000);
  };

  return (
    <ProductContext.Provider
      value={{
        fetchProductCart,
        session,
        productCart,
        addToCart,
        productCount,
        setProductCount,
        setProductSubTotal,
        productSubTotal,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
