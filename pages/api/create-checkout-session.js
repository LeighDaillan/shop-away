const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const shortDescription = function (description) {
    const maxLength = 150;

    let trimmedString = description.substr(0, maxLength);

    return (trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    ));
  };

  const transformedItems = items.map((item) => ({
    quantity: item.qty,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: shortDescription(item.description),
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 10 * 100, currency: "usd" },
          display_name: "Express Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 4 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 7 * 100, currency: "usd" },
          display_name: "Regular Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 7 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_URL}/Success`,
    cancel_url: `${process.env.NEXT_URL}/Cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
