const stripe = Stripe('pk_test_Gt8VWq5Ty87dWXB5XB5yy95F00sclCYHzk');
import axios from 'axios';

export const bookTour = async (tourId) => {
  try {
    // 1) get checkout session from endpoint
    const url = `/api/v1/bookings/checkout-session/${tourId}`;
    const session = await axios(url);
    // console.log(session);

    // 2) create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
