/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetchQuery from '@/hooks/shared/useFetch';
import Loader from '@/others/Loader';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Pagination,
  Spacer,
} from '@nextui-org/react';
import { Separator } from '@radix-ui/react-separator';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

const Tests = () => {
  const formattedDate = (currentDate: any) => {
    return format(currentDate, 'yyyy-MM-dd');
  };
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // const initialDate = new Date();
  // initialDate.setHours(10, 0, 0);

  const [date, setDate] = useState<Date | null>(null);

  const {
    data,
    isLoading: isFetching,
    isSuccess,
    refetch,
  } = useFetchQuery(
    date ? '/test/date/' + formattedDate(date) : '/test/future/',
    { page }
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setPage(data?.meta?.page);
      setTotal(data?.meta?.total);
      console.log(data?.meta?.total);
    }
  }, [isSuccess, data]);
  const pages = Math.ceil(total / 6);

  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const minTime = new Date();
  minTime.setHours(10, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(22, 0, 0);

  const onPaginate = (value: any) => {
    console.log(value);
    setPage(value);
    refetch();
  };
  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className="max-w-7xl w-[93%] mx-auto">
      <Spacer className="my-10" />
      <div className=" flex w-full justify-end">
        <div className="bg-for flex  justify-between gap-4 w-fit items-center px-4 rounded-2xl ">
          <Calendar />
          <ReactDatePicker
            className="bg-transparent z-10 flex justify-center items-center flex-1 cursor-pointer focus:outline-none h-[44px] w-full"
            selected={date}
            dateFormat="dd-MM-yyyy"
            placeholderText="Choose Booking Date"
            onChange={(newDate: Date | null) => {
              setPage(1);
              setDate(newDate);
            }}
            isClearable
            minDate={new Date()}
            withPortal
            todayButton="Today"
          />
        </div>
      </div>
      <Spacer className="my-10" />
      {data.data.length < 1 && (
        <>No Services Available Matching Date. Please Choose Another Date</>
      )}
      <div className=" grid grid-cols-1  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data.data.map((item: any, index: string) => (
          <Card
            as={Link}
            to={
              date
                ? '/detail/' + item._id + '/' + formattedDate(date)
                : '/detail/' +
                  item._id +
                  '/' +
                  format(new Date(item.slots[0].startTime), 'yyyy-MM-dd')
            }
            radius="lg"
            className="bg-back"
            shadow="lg"
            key={index}
          >
            <CardBody className="overflow-visible p-0 relative">
              <div className="absolute  bg-danger  z-20  py-2 px-1 rounded-lg   top-3 left-3">
                <p className="text-white text-sm font-semibold">
                  {' '}
                  ৳{item.price}
                </p>
              </div>
              <Image
                shadow="sm"
                radius="none"
                loading="lazy"
                width="100%"
                alt={item.image}
                className="w-full object-cover h-[270px]"
                src={item.image}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
              <Button size="sm" color="danger">
                {' '}
                See Details
              </Button>
            </CardFooter>
            <Separator className="border border-divider border-dashed w-full"></Separator>
            <CardFooter className="flex flex-col w-full">
              <p className=" text-tiny line-clamp-2  w-full text-light-50">
                {item.description}
              </p>
            </CardFooter>
            <Separator className="border border-divider border-dashed w-full"></Separator>
            <CardFooter className="flex  justify-start flex-col gap-2 w-full">
              <div className="flex  mb-1   w-full justify-between">
                <p className="text-tiny"> Available Bookings</p>
              </div>
              <div className="flex  gap-2 justify-center flex-wrap">
                {item?.slots?.slice(0, 4)?.map((slot: any) => (
                  <Chip key={slot._id} variant="bordered">
                    {format(new Date(slot.startTime), 'dd,MMM hh:mm a')}
                  </Chip>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Spacer className="my-10" />
      <div className="py-2 px-2 flex justify-between items-center">
        {data.data.length > 0 && (
          <>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={isFetching ? 1 : page}
              total={isFetching ? 10 : pages}
              onChange={onPaginate}
            />

            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
              >
                Previous
              </Button>
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onNextPage}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tests;
