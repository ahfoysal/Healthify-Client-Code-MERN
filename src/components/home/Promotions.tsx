import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const Promotions = () => {
  return (
    <div className=" mb-10 text-[#161616] bg-[length:100%_430px]  md:bg-[length:100%_334px] rounded-2xl  w-[93%] lg:w-full max-w-7xl  bg-center  bg-no-repeat  mx-auto lg:bg-[url('/banner.jpg')] bg-[url('/banner_m.jpg')]      ">
      <div className="md:p-10 p-4 text-center md:text-left justify-center h-fit md:h-[334px]  flex flex-col gap-5">
        <h2
          className="text-3xl md:text-5xl  w-full md:max-w-[500px] font-black
        bg-gradient-to-r from-indigo-500 via-green-500 to-danger inline-block text-transparent bg-clip-text"
        >
          Get 15% Off
        </h2>
        <h2 className="text-lg  max-w-[450px]">
          Book your first checkup and enjoy a 15% discount with code
          'NewUser15'. Take advantage of this exclusive offer on your initial
          booking!{' '}
        </h2>
        <Button
          as={Link}
          to={'/tests'}
          className="w-fit font-semibold mx-auto md:mx-0 bg-[#d4d4d8] text-[#161616] "
          size="lg"
        >
          Book Now!
        </Button>
      </div>
    </div>
  );
};

export default Promotions;
