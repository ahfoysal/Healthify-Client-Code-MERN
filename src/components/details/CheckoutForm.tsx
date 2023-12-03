/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@nextui-org/button';
import { Snippet } from '@nextui-org/react';

export default function CheckoutForm({ handlePaymentSuccess }: any) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    if (
      (response.error && response.error.type === 'card_error') ||
      (response.error && response.error.type === 'validation_error')
    ) {
      setMessage(response.error && response.error.message);
    } else {
      setMessage('Waiting For COnfirmation.');
      setTimeout(() => {
        setMessage(response.error?.message || 'An unexpected error occurred.');
      }, 5000);
      console.log(response);
    }
    if (response.paymentIntent?.status === 'succeeded') {
      handlePaymentSuccess(response.paymentIntent.id);
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {message && (
        <div id="payment-message" className="text-red mt-5">
          {message}
        </div>
      )}
      <Snippet
        symbol="Card"
        className="text-black mt-4 w-full"
        variant="bordered"
      >
        4242424242424242
      </Snippet>
      <Button color="secondary" type="submit" className="w-full mt-10">
        {isProcessing ? 'Processing ... ' : 'Pay now'}
      </Button>
      {/* Show any error or success messages */}
    </form>
  );
}
