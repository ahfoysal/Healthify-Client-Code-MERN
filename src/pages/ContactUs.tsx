import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';

const ContactUs = () => {
  return (
    <div className="w-[93%] max-w-7xl  md:grid-cols-2  mx-auto grid grid-cols-1 justify-center items-center min-h-screen">
      <div className=" hidden md:flex justify-center items-center">
        <Player
          autoplay
          loop
          src="https://lottie.host/a1a5f6ba-fffd-4887-a289-638b75651637/gFaYX8uQLu.json"
          style={{ height: '500px', width: '500px' }}
        ></Player>
      </div>

      <div className="">
        <p className="text-3xl font-medium mb-4"> Drop Us A Line</p>
        <p className="text-base font-base  text-light-50">
          We normally respond within 2 business days
        </p>
        <div className="flex mt-6 w-full flex-col gap-4">
          <Input className="w-full " variant="bordered" label="Full Name" />
          <Input className="w-full " variant="bordered" label="Email" />
          <Input className="w-full " variant="bordered" label="Subject" />
          <Textarea className="w-full " variant="bordered" label="Message" />
        </div>
        <Button size="md" className="mt-10 font-medium" color="primary">
          Send Request
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;
