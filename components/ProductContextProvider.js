import { useState, createContext } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { database } from "@/firebaseConfig";

export const ProductContext = createContext();

const ProductProvider = function (props) {
  const { data: session } = useSession();
  const [productCart, setProductCart] = useState([]);
  const [purchasedProduct, setPurchasedProduct] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [productSubTotal, setProductSubTotal] = useState("00.00");
  const [notif, setNotif] = useState(false);

  const fetchProductCart = async function () {
    if (!session) return;

    console.log("Fetching product");

    const usersCollectionRef = collection(database, session?.user?.email);
    const q = query(usersCollectionRef, where("status", "==", "cart"));

    const querySnapshot = await getDocs(q);
    setProductCart(
      querySnapshot.docs.map((doc) => {
        return { ...doc.data(), firebase_id: doc.id };
      })
    );
  };

  const updateCart = function () {
    productCart.map(async (data) => {
      const productRef = doc(database, session.user.email, data.firebase_id);
      await updateDoc(productRef, { ...data, status: "purchased" });
    });
  };

  const fetchProductPurchased = async function () {
    if (!session) return;

    console.log("Fetching product Purchased");

    const usersCollectionRef = collection(database, session?.user?.email);
    const q = query(usersCollectionRef, where("status", "==", "purchased"));

    const querySnapshot = await getDocs(q);
    setPurchasedProduct(
      querySnapshot.docs.map((doc) => {
        return { ...doc.data() };
      })
    );
  };

  const showNotif = function () {
    setNotif(true);

    setTimeout(() => {
      setNotif(false);
    }, 1000);
  };

  const removeProduct = async function (data) {
    const productRef = doc(database, session.user.email, data.firebase_id);
    if (data.qty > 1) {
      await updateDoc(productRef, { ...data, qty: +data.qty - 1 });
    } else {
      await deleteDoc(productRef);
    }
    fetchProductCart();
    showNotif();
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
          fetchProductCart();
        }
      );

      // If is in cart and with qty
    } else if (isInCart && "qty" in data) {
      const cartRef = doc(database, session.user.email, isInCart.firebase_id);
      await updateDoc(cartRef, {
        ...isInCart,
        qty: +isInCart.qty + +data.qty,
      }).then(() => {
        fetchProductCart();
      });

      // If not in cart and with qty
    } else if (!isInCart && "qty" in data) {
      const cartRef = collection(database, session.user.email);
      const dataCart = { ...data, status: "cart" };
      const document = await addDoc(cartRef, dataCart).then(() => {
        fetchProductCart();
      });

      // if not in cart and no qty
    } else {
      const cartRef = collection(database, session.user.email);
      const dataCart = { ...data, status: "cart", qty: 1 };
      const document = await addDoc(cartRef, dataCart).then(() => {
        fetchProductCart();
      });
    }
    fetchProductCart();
    alert("Added to your cart");
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
        removeProduct,
        notif,
        purchasedProduct,
        fetchProductPurchased,
        updateCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
