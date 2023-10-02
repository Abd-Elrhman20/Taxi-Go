"use client"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'
import CheckoutForm from './CheckoutForm'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmount'
import { useRouter } from 'next/navigation'


const PaymentPage = () => {
    // const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any);
    const options: any = {
        mode: 'payment',
        amount: 50,
        currency: 'usd',
    };

    // const router = useRouter()
    // get carAmount from Booking.tsx
    // const {carAmount} = router.query



    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
            {/* <CheckoutForm carAmount={carAmount}/> */}
        </Elements>
    )
}

export default PaymentPage