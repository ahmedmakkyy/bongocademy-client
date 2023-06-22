import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get('price');
//   const className = queryParams.get('name');
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div className='w-1/2'>
            Amount To Pay: {price}
            <Elements stripe={stripePromise}>
            <CheckoutForm price={price}>

            </CheckoutForm>
            </Elements>
            

        </div>
    );
};

export default Payment;