/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutModal from '@/components/details/CheckoutModal';
import { AuthContext } from '@/hooks/AuthContextProvider';
import useFetchQuery from '@/hooks/shared/useFetch';
import Loader from '@/others/Loader';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Radio,
  RadioGroup,
  Spacer,
  useDisclosure,
} from '@nextui-org/react';

import { Separator } from '@radix-ui/react-separator';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Details = () => {
  const initialDate = new Date();
  initialDate.setHours(10, 0, 0);
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState<Date | null>(initialDate);
  const [selectedID, setSelectedID] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const { id, date: selectedDate } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formattedDate = (currentDate: any) => {
    return format(currentDate, 'yyyy-MM-dd');
  };
  const {
    data,
    isLoading: isFetching,
    isSuccess,
    refetch,
  } = useFetchQuery('/test/date/' + id + '/' + formattedDate(date));
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.price);
      setTotalPrice(data.data.price);
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (!selectedDate) {
      console.log('today');
      setDate(new Date());
      // console.log(formattedDate(new Date()));
    } else {
      console.log('selectedDate');
      setDate(new Date(selectedDate));
    }
  }, [selectedDate]);
  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="w-[93%] max-w-7xl mx-auto">
      <Spacer className="my-10" />
      <div className="flex flex-col md:flex-row  w-full gap-16 justify-around">
        <div className="flex-1 flex md:justify-center">
          <Image className="w-full h-full" height={600} src={data.data.image} />
        </div>

        <div className="flex-1 w-full">
          <p className="text-3xl font-bold mb-3">{data.data.name}</p>
          <p className="text-base  mb-6 text-light-50">
            {data.data.description}
          </p>
          <Separator className="border border-divider border-dashed w-full"></Separator>
          <Spacer className="my-10" />
          <Card radius="lg" className="bg-back" shadow="lg">
            <CardBody className="overflow-visible p-6 relative">
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold"> ৳{data.data.price}</h1>
              </div>
              <Spacer className="my-5" />

              <div className="bg-for flex   gap-4 w-full items-center px-4 rounded-xl ">
                <Calendar />
                <ReactDatePicker
                  className="bg-transparent z-10 flex justify-center items-center flex-1 cursor-pointer focus:outline-none h-[44px] w-full"
                  selected={date}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select a Booking Date"
                  onChange={(newDate: Date | null) => {
                    setDate(newDate);
                    refetch();
                  }}
                  minDate={new Date()}
                  withPortal
                  todayButton="Today"
                />
              </div>

              <Spacer className="my-5" />
              {data.data.slots.length > 0 ? (
                <RadioGroup
                  value={selectedID}
                  onValueChange={setSelectedID}
                  label="Select Time for Booking "
                  isRequired
                >
                  {data.data.slots.map((slot: any) => (
                    <Radio
                      isDisabled={
                        slot.numberOfSlots - slot.bookedSlots === 0 ||
                        new Date(slot.startTime) < new Date()
                      }
                      key={slot._id}
                      value={slot._id}
                    >
                      {format(new Date(slot.startTime), 'dd,MMM hh:mm a')}{' '}
                      <span className="text-tiny ml-3 text-danger">
                        {new Date(slot.startTime) < new Date()
                          ? ' Time is over for this slot'
                          : ` Available Slot: ${
                              slot.numberOfSlots - slot.bookedSlots
                            }`}
                      </span>
                    </Radio>
                  ))}
                </RadioGroup>
              ) : (
                <p className="text-lg font-bold text-danger mb-3">
                  No Booking Available. Choose Another Date
                </p>
              )}
            </CardBody>
            <Separator className="border border-divider border-dashed w-full"></Separator>
            <CardFooter className="flex  justify-start p-6 flex-col gap-2 w-full">
              <Button
                onPress={() => {
                  if (user && user.userStatus === 'banned') {
                    toast.error(
                      'Your Account has been banned, Contact the administrator for more information.'
                    );
                  } else if (!selectedID) {
                    toast.error('Please select a booking time');
                  } else {
                    onOpen();
                  }
                }}
                isDisabled={selectedID ? false : true}
                size="lg"
                color="primary"
                className="w-full"
              >
                Reserve
              </Button>
            </CardFooter>
            <CheckoutModal
              isOpen={isOpen}
              userId={user?._id}
              amount={totalPrice}
              setTotalPrice={setTotalPrice}
              price={data.data.price}
              slotId={selectedID}
              onOpenChange={onOpenChange}
              testID={id}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Details;
