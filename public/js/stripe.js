/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    "pk_test_51KO3NBLEVZIbGTluyHBxcRfAqQQoM6XGqdZkSynGqWcBmLFmTgUho0xgE0trSZ2srIBYTQvRR0qCGRPfGxWhoElf00iTzhvdzI"
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
