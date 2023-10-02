'use client'
import React from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = (props:any) => {
    const stripe: any = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (elements == null) {
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            return;
        }

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({ amount: 600 }),
        });
        const secretKey = await res.json();
        // console.log(secretKey);
        // console.log(props.carAmount);

        await stripe.confirmPayment({
            clientSecret: secretKey,
            elements,
            confirmParams: {
                return_url: 'https://taxi-go-taupe.vercel.app/',
            }
        })
    };

    return (
        <div className='m-auto w-50 mt-5'>
            <form onSubmit={handleSubmit} className='max-w-xl'>
                <PaymentElement />
                <button className='w-full bg-yellow-400 p-2 rounded-lg mt-2' disabled={!stripe || !elements}>Submit</button>
            </form>
        </div>
    )
}

export default CheckoutForm
