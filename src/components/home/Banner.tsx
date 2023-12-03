import { Icons } from '@/assets/icons/Icons';
import useFetchQuery from '@/hooks/shared/useFetch';
import Loader from '@/others/Loader';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function Banner() {
  const { data, isLoading: isFetching } = useFetchQuery('/banners/active');

  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className=" relative py-20 w-full  banner-Container bg-fixed  ">
      <div className="max-w-7xl w-[93%]   flex flex-col gap-10 md:gap-0 md:flex-row justify-around md:w-full  mx-auto">
        <div className="flex flex-col max-w-xl text-center  items-center gap-6 ">
          <h1 className="text-3xl font-bold">{data?.data?.title}</h1>
          <h1 className="text-sm text-light-50 ">{data?.data?.description}</h1>
          <div className="">
            <h1
              className="text-5xl font-black
        bg-gradient-to-r from-indigo-500 via-green-500 to-danger inline-block text-transparent bg-clip-text"
            >
              {data?.data?.couponText}
            </h1>
            <h1 className="text-sm ">
              Use{' '}
              <span className=" font-bold bg-gradient-to-r from-yellow via-yellow to-green inline-block text-transparent bg-clip-text">
                {data.data?.couponCode}
              </span>{' '}
              to get {data.data?.discountRate}% Discount.
            </h1>
          </div>

          <Button
            radius="sm"
            as={Link}
            to={'/tests'}
            color="primary"
            className="font-medium z-20"
            size="lg"
          >
            See Our Services
          </Button>
        </div>
        <div>
          <Image
            src={data.data?.image}
            className="w-full h-full max-h-[400px]"
          />
        </div>
      </div>
      <div className="absolute z-10 bottom-0 w-full hidden dark:flex">
        <Icons.wave />
      </div>
    </div>
  );
}
