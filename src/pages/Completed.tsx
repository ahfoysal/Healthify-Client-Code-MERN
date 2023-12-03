import ChevronLeft from '@/assets/icons/ChevronLeftIcon';
import useFetchQuery from '@/hooks/shared/useFetch';
import Loader from '@/others/Loader';
import { Button, Card, CardBody, Image, Spacer } from '@nextui-org/react';
import { Separator } from '@radix-ui/react-separator';
import { format } from 'date-fns';

import { Link, useParams } from 'react-router-dom';

const Completed = () => {
  const { id } = useParams();

  const {
    data,
    isLoading: isFetching,
    isSuccess,
  } = useFetchQuery('/bookings/' + id);

  if (isSuccess) {
    console.log(data);
  }
  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="w-[93%] max-w-7xl mx-auto">
      <Spacer className="my-10" />
      <div className="flex flex-col md:flex-row w-full gap-16 justify-around">
        <div className="flex-1 flex md:justify-center">
          <Image
            className="w-full h-full"
            height={600}
            src={data.data.test.image}
          />
        </div>

        <div className="flex-1 w-full">
          <p className="text-4xl font-bold mb-8"> Booking Completed 🎉</p>
          <p className="text-xl font-semibold ">{data.data.test.name}</p>
          <p className="text-base  mb-6 text-light-50">
            {data.data.description}
          </p>
          <Spacer className="my-5" />
          <Card
            radius="lg"
            className="bg-transparent border border-dashed border-divider"
            shadow="none"
          >
            <CardBody className="overflow-visible p-10 relative">
              <div className="flex flex-col">
                <h1 className="text-2xl font-medium  "> Booking Details</h1>
                <div className="flex justify-between mt-5">
                  <h1 className="text-base font-medium text-light-50">
                    Booking Date
                  </h1>
                  <h1 className="text-base font-medium">
                    {' '}
                    {format(
                      new Date(data.data.slot.startTime),
                      'dd,MMM hh:mm a'
                    )}
                  </h1>
                </div>
                <Separator className="border border-divider my-4 border-dashed w-full"></Separator>
              </div>

              {data.data.isCouponApplied && (
                <div className="flex justify-between ">
                  <h1 className="text-sm font-medium text-danger ">
                    {data.data.couponCode}
                  </h1>

                  <h1 className="text-sm font-medium">
                    {data.data.discountRate}%
                  </h1>
                </div>
              )}
              <div className="flex justify-between mt-3">
                <h1 className="text-base font-medium text-light-50">Total</h1>

                <h1 className="text-base font-medium">৳{data.data.total}</h1>
              </div>
              <div className="flex justify-between mt-3 ">
                <h1 className="text-base font-medium text-light-50">
                  Payment method
                </h1>

                <h1 className="text-base font-medium">
                  {data.data.paymentMethod}
                </h1>
              </div>
            </CardBody>
          </Card>
          <div className="flex mt-10 justify-center">
            <Button
              startContent={<ChevronLeft />}
              variant="bordered"
              as={Link}
              to={'/'}
              className="border-divider"
            >
              Back Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
