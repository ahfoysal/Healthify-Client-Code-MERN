/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetchQuery from '@/hooks/shared/useFetch';
import Loader from '@/others/Loader';
import { Card, CardBody, CardFooter, Image, Spacer } from '@nextui-org/react';
import { Separator } from '@radix-ui/react-separator';
import { Link } from 'react-router-dom';

const TopServices = () => {
  const { data, isLoading: isFetching, isSuccess } = useFetchQuery('/test/top');
  if (isSuccess) {
    console.log(data);
  }

  if (isFetching) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Our Top Services </h1>
      <Spacer className="my-10" />
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-4">
        {data.data.map((item: any, index: string) => (
          <Card
            as={Link}
            to={'/detail/' + item._id}
            radius="lg"
            className="bg-back"
            shadow="lg"
            key={index}
          >
            <CardBody className="overflow-visible p-0 relative">
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
              <p className="text-default-500"> ৳{item.price}</p>
            </CardFooter>
            <Separator className="border border-divider border-dashed w-full"></Separator>
            <CardFooter className="text-tiny  text-light-50">
              <b className="line-clamp-3">{item.description}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopServices;
