import React from "react";
import StripeCheckout from "react-stripe-checkout";
// import { Notification, Message } from "element-react";

const stripeConfig = {
  currency: "USD",
  publishableAPIKey: "pk_test_u45gFnpf3jZbVWTiLE0JUZQx00GU2M5y6R"
};

const PayButton = ({ product, user }) => {
  return (
    <StripeCheckout
      email={user.attributes.email}
      name={product.description}
      amount={product.price}
      currency={stripeConfig.currency}
      stripeKey={stripeConfig.publishableAPIKey}
      billingAddress={product.shipped}
      shippingAddress={product.shipped}
      locale="auto"
      allowRememberMe={false}
    />
  );
};

export default PayButton;
