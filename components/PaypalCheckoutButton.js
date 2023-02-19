import { PayPalButtons } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { ProductContext } from "./ProductContextProvider";
import { doc } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { useRouter } from "next/router";

const PaypalCheckoutButton = function () {
  const { productSubTotal, productCart } = useContext(ProductContext);
  const changeStatusProduct = function () {
    const productRef = doc(database, session.user.email, data.firebase_id);
  };
  const router = useRouter();
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: productSubTotal,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("Order", order);
        // changeStatusProduct(productCart);
      }}
      onCancel={() => {
        router.push("/Cart");
      }}
      onError={(err) => {
        console.log("Paypal Error", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
