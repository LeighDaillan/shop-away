import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  : admin.app();

const fulfillOrder = function (session) {
  return getirestore(app).collection("users").doc(session.metadata.email);
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("Error from webhook", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(session);
      return fulfillOrder(session);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
