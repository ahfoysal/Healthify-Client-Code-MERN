/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalContent, Input, Button } from '@nextui-org/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import usePostMutate from '@/hooks/shared/usePostMutate';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { Separator } from '@radix-ui/react-separator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CheckoutModal = ({
  isOpen,
  onOpenChange,
  amount,
  slotId,
  price,
  testID,

  setTotalPrice,
}: any) => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isCouponError, SetIsCouponError] = useState('');
  const [isCouponSuccess, SetIsCouponSuccess] = useState<any>(null);
  const [couponText, setCouponText] = useState('');

  const onSuccess = (response: any) => {
    console.log(response.data.data);
    setClientSecret(response.data.data);
  };
  const navigate = useNavigate();
  const { mutate } = usePostMutate('/stripe', onSuccess, () => {
    toast.error("Couldn't create payment gateway, try again later.");
  });
  const { mutate: handleBooking } = usePostMutate(
    '/bookings',
    (res) => {
      toast.success('Booked Successfully');
      navigate('/completion/' + res.data.data._id);

      console.log(res.data);
    },
    () => {
      toast.error("Couldn't create payment gateway, try again later.");
    }
  );
  useEffect(() => {
    //
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_KEY));
  }, []);

  const handlePayment = () => {
    mutate({
      amount,
    });
  };
  const { mutate: validateCoupon } = usePostMutate(
    '/coupon',
    (res) => {
      console.log(res.data.data);
      toast.success('Coupon Applied Successfully');
      SetIsCouponSuccess(res.data.data);
      setTotalPrice(calculateGrandTotal(price, res.data.data.discountRate));
      SetIsCouponError('');
    },
    (err) => {
      SetIsCouponError(err?.response?.data?.message);
    }
  );
  const handlePaymentSuccess = (id: string) => {
    console.log('success', id);
    const data: any = {
      slot: slotId,
      paymentMethod: 'Stripe',
      trxId: id,
      total: amount,
      originalPrice: price,
      test: testID,
    };
    if (isCouponSuccess) {
      data.isCouponApplied = true;
      data.couponCode = isCouponSuccess.couponCode;
      data.discountRate = isCouponSuccess.discountRate;
    }
    console.log(data);
    handleBooking(data);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="bg-primary">
        {(onClose) => (
          <>
            <Card className="bg-primary text-black border-none">
              <CardHeader>
                <CardTitle>Confirm and Pay</CardTitle>
              </CardHeader>

              <CardContent>
                {!clientSecret && (
                  <div className="flex flex-col gap-4">
                    <div className="">
                      <Input
                        color={isCouponSuccess ? 'success' : 'secondary'}
                        variant="bordered"
                        isDisabled={isCouponSuccess ? true : false}
                        isInvalid={isCouponError ? true : false}
                        errorMessage={isCouponError}
                        placeholder="Apply a coupon"
                        onChange={(e) => setCouponText(e.target.value)}
                        endContent={
                          <Button
                            onPress={() => {
                              if (!couponText) {
                                return;
                              }
                              validateCoupon({ couponCode: couponText });
                            }}
                            color="danger"
                          >
                            Apply
                          </Button>
                        }
                      />
                    </div>
                    {isCouponSuccess && (
                      <div className="flex justify-between">
                        <h1 className="text-xs text-green font-semibold">
                          {' '}
                          {isCouponSuccess.couponCode}
                        </h1>
                        <h1 className="text-xs font-semibold">
                          {' '}
                          {isCouponSuccess.discountRate}%
                        </h1>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <h1 className="text-2xl font-semibold"> Total</h1>
                      <h1 className="text-2xl font-semibold">
                        {' '}
                        {isCouponSuccess && (
                          <span className="text-red line-through text-xs mr-5">
                            ৳ {price}
                          </span>
                        )}
                        ৳{' '}
                        {isCouponSuccess
                          ? calculateGrandTotal(
                              price,
                              isCouponSuccess.discountRate
                            )
                          : amount}
                      </h1>
                    </div>
                  </div>
                )}
                {stripePromise && clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                    }}
                  >
                    <CheckoutForm handlePaymentSuccess={handlePaymentSuccess} />
                  </Elements>
                )}
              </CardContent>

              {!clientSecret && (
                <>
                  <Separator className="border border-light-50 mb-3 border-dashed w-full"></Separator>
                  <CardFooter className="gap-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>

                    <Button
                      color="secondary"
                      onPress={handlePayment}
                      className="w-full"
                    >
                      Continue Payment
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CheckoutModal;
const calculateGrandTotal = (amount: number, discountRate: number): number => {
  if (discountRate < 0 || discountRate > 100) {
    throw new Error(
      'Invalid discount rate. Please provide a value between 0 and 100.'
    );
  }

  const discountRateDecimal = discountRate / 100;

  const discountedAmount = amount * discountRateDecimal;

  const grandTotal = amount - discountedAmount;

  return Number(grandTotal.toFixed(2));
};
