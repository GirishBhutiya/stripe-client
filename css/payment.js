document.addEventListener('DOMContentLoaded', async () => {
    const stripe = Stripe('pk_test_51Lh92JAq5gxwsV5EftmVXmKsujX135KVxBTrmY1WhFN1GIQ4U2QWgMJKb29Utt5UtfPH8DoCgfbhDjWjqV2PMixV00kk1C92Vd');

    /* const {resp} = await fetch("http://localhost:2024/api/deposit",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET"
        },
        body: JSON.stringify({
            "price":100,
            "discount":5,
            "paid":95,
            "credits":50,
            "bonus":5
        })})
        .then(response => response.json())
    const clientSecret = resp.payload.deposit.paymentIntentJSON.client_secret; */
    const clientSecret = "pi_3PSeqWAq5gxwsV5E03FiwSCV_secret_IvkCBjkkwRfvuZIjpbAaxYplu";
    const elements = stripe.elements({clientSecret});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const {error} = await stripe.confirmPayment( { 
            elements,
            confirmParams: {
                return_url: window.location.href.split("?")[0] + 'complete.html'
            }
         })
         if (error) {
            const errorElement = document.getElementById('error-messages');
            errorElement.innerHTML = error.message;
         }
    });
});