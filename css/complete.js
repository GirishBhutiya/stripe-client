document.addEventListener('DOMContentLoaded', async () => {
    const stripe = Stripe('pk_test_51Lh92JAq5gxwsV5EftmVXmKsujX135KVxBTrmY1WhFN1GIQ4U2QWgMJKb29Utt5UtfPH8DoCgfbhDjWjqV2PMixV00kk1C92Vd');

    const params = new URLSearchParams(window.location.href);
    const clientSecret = params.get('payment_intent_client_secret');

    const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret)

    const pre = document.getElementById('payment-intent');
    pre.innerHTML = JSON.stringify(paymentIntent, null, 2);
});