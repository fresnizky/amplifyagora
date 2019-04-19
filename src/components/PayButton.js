import React from "react";
import { API } from "aws-amplify";
import StripeCheckout from "react-stripe-checkout";
// import { Notification, Message } from "element-react";

const stripeConfig = {
  currency: "USD",
  publishableAPIKey: "pk_test_u45gFnpf3jZbVWTiLE0JUZQx00GU2M5y6R"
};

const PayButton = ({ product, user }) => {
  const handleCharge = async token => {
    try {
      const result = await API.post("orderlambda", "/charge", {
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: product.price,
            description: product.description
          }
        }
      });

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <StripeCheckout
      token={handleCharge}
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
