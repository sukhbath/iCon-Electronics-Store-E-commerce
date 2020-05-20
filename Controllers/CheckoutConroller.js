const stripe = require('stripe')('sk_test_FctNa3kg0JEiGdM2HWtb6X8e00KvFuaOZE');

const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
        price: '{PRICE_ID}',
        quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
});