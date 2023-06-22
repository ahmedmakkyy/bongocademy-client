import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import './style.css'
import useSelectedClasses from '../../hooks/useSelectedClasses';
import Swal from 'sweetalert2';

const CheckoutForm = ({ price, className }) => {
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [classes] = useSelectedClasses()
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price }).then((res) => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        });
    }, [price, axiosSecure]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        console.log(card);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        });

        if (confirmError) {
            console.log(confirmError);
        }

        console.log(paymentIntent);
        setProcessing(false);

        if (paymentIntent.status === 'succeeded') {

            setTransactionId(paymentIntent.id);

            const payment = {
                name: user?.displayName,
                email: user?.email,
                price,
                transactionID: paymentIntent.id,
                date: new Date(),
                classes,
                className: className
            };

            axiosSecure.post('/payments', payment).then((res) => {
                if (res.data.insertedId) {
                    console.log(res.data);
                    // Display confirmation to the user

                    // Update the enrolled number for each class in the backend
                    classes.forEach((selectedClass) => {
                        const classId = selectedClass.select_id;

                        axiosSecure.patch(`/allApprovedClasses/${classId}`).then((res) => {
                            console.log(res.data);
                        });
                    });
                }
            });

            Swal.fire({
                title: 'Payment Successfull. Check Enrolled Classes',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    const buttonStyles = {
        fontSize: '16px',
        padding: '12px 24px',
        backgroundColor: '#0066ff',
        color: '#ffffff',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        marginTop: '20px',
        disabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <CardElement options={cardElementOptions} />
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    style={buttonStyles}

                >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red">{cardError}</p>}
            {transactionId && (
                <p className="text-success">Successful Transaction! Transaction ID: {transactionId}</p>
            )}
        </div>
    );
};

export default CheckoutForm;
