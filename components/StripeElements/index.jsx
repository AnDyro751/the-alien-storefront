import ComponentButton from "../Button";
import { loadStripe } from "@stripe/stripe-js";
import {
  COOKIE_CURRENCY_NAME,
  COOKIE_SPREE_ORDER,
  WEB_ENDPOINT,
} from "../../src/lib/apiConstants";
import getCookie from "../../src/lib/getCookie";
const stripePromise = loadStripe(
  "pk_test_51IX9BNFtFW4yYd5sdzOwy9m0vituic2Yi3Jed5C1uDYxjtzk5LxXtkbIKPnIGd3KToeEjYi2g4jMSLLpq3M6REqh00KGiW6AWB"
);
const StripeElements = () => {
  const onHandleClick = async () => {
    const stripe = await stripePromise;

    const response = await fetch(
      `${WEB_ENDPOINT}/stripe_checkout?currency=${getCookie(
        document.cookie,
        COOKIE_CURRENCY_NAME
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Spree-Order-Token": getCookie(document.cookie, COOKIE_SPREE_ORDER),
        },
      }
    );

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div className="w-full">
      <h2>Stripe</h2>
      <ComponentButton handleClick={onHandleClick} text="Ir a pagar" />
    </div>
  );
};
// {"authenticity_token"=>"[FILTERED]", "order"=>{"state_lock_version"=>"9", "payments_attributes"=>[{"payment_method_id"=>"3"}]}, "payment_source"=>{"3"=>{"name"=>"Angel Mendez", "gateway_payment_profile_id"=>"tok_1InYZ4FtFW4yYd5sT0trKpOx", "number"=>"[FILTERED]", "month"=>"4", "year"=>"2024"}}, "locale"=>nil, "state"=>"payment"}

export default StripeElements;
