import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import StripeCheckout from "react-stripe-checkout";
// import { Notification, Message } from "element-react";

const stripeConfig = {
  currency: "USD",
  publishableAPIKey: "pk_test_u45gFnpf3jZbVWTiLE0JUZQx00GU2M5y6R"
};

const PayButton = ({ product, user }) => {
  const getOwnerEmail = async ownerId => {
    try {
      const input = { id: ownerId };
      const result = await API.graphql(graphqlOperation(getUser, input));
      return result.data.getUser.email;
    } catch (err) {
      console.error(`Error fetching product owner's email`, err);
    }
  };

  const handleCharge = async token => {
    try {
      const ownerEmail = await getOwnerEmail(product.owner);
      console.log({ ownerEmail });
      const result = await API.post("orderlambda", "/charge", {
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: product.price,
            description: product.description,
            shipped: product.shipped
          },
          email: {
            customerEmail: user.attributes.email,
            ownerEmail,
            shipped: product.shipped
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
