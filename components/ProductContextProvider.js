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
  const [cartTotal, setCartTotal] = useState("0");
  const [productCart, setProductCart] = useState([]);

  const cartNumber = async function () {
    const usersCollectionRef = collection(database, session.user.email);
    const q = query(usersCollectionRef, where("status", "==", "cart"));

    const querySnapshot = await getDocs(q);
    setCartTotal(querySnapshot.docs.map((doc) => doc.data()).length);
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
      await updateDoc(cartRef, { ...isInCart, qty: +isInCart.qty + 1 }).then(
        () => {
          cartNumber();
          alert("Added to your cart");
        }
      );

      // If is in cart and with qty
    } else if (isInCart && "qty" in data) {
      const cartRef = doc(database, session.user.email, isInCart.firebase_id);
      await updateDoc(cartRef, {
        ...isInCart,
        qty: +isInCart.qty + +data.qty,
      }).then(() => {
        cartNumber();
        alert("Added to your cart");
      });

      // If not in cart and with qty
    } else if (!isInCart && "qty" in data) {
      const cartRef = collection(database, session.user.email);
      const dataCart = { ...data, status: "cart" };
      const document = await addDoc(cartRef, dataCart).then(() => {
        cartNumber();
        alert("Added to your cart");
      });
      // if not in cart and no qty
    } else {
      const cartRef = collection(database, session.user.email);
      const dataCart = { ...data, status: "cart", qty: 1 };
      const document = await addDoc(cartRef, dataCart).then(() => {
        cartNumber();
        alert("Added to your cart");
      });
    }
  };

  return (
    <ProductContext.Provider
      value={{ cartTotal, cartNumber, session, productCart, addToCart }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
