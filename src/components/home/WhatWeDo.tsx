import { Player } from '@lottiefiles/react-lottie-player';
import { Card, CardBody, CardHeader, Spacer } from '@nextui-org/react';

const WhatWeDo = () => {
  return (
    <div className="my-20">
      <h1 className="text-3xl font-bold text-center">What We Do </h1>
      <Spacer className="my-6" />
      <h1 className="text-sm  max-w-lg md:max-w-3xl text-center mx-auto text-primary/60 ">
        We bring healthcare to your convenience, offering a comprehensive range
        of on-demand medical services tailored to your needs. Our platform
        allows you to connect with experienced online doctors who provide expert
        medical advice, issue online prescriptions, and offer quick refills
        whenever you require them.
      </h1>
      <Spacer className=" my-20" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <Card shadow="none" className="py-16 px-5  border-none bg-transparent">
          <CardHeader className="pb-0 pt-2 px-4 flex-col w-full justify-center items-center">
            <Player
              autoplay
              loop
              src="https://lottie.host/5e73ea2b-ff3b-4689-868d-8c52c68c2b3c/oJbuModKzv.json"
              style={{ height: '100px', width: '100%' }}
            ></Player>
          </CardHeader>
          <CardBody className="overflow-visible border-none ">
            <div className="flex justify-center flex-col items-center">
              <p className="text-xl uppercase font-bold">Emergency Care</p>

              <h1 className="text-sm  mt-3 text-center mx-auto text-light-50 ">
                Our Emergency Care service is designed to be your reliable
                support in critical situations.
              </h1>
            </div>
          </CardBody>
        </Card>

        <Card
          shadow="lg"
          className="py-16 px-5 shadow-[500px] border-none bg-transparent"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col w-full justify-center items-center">
            <Player
              autoplay
              loop
              src="https://lottie.host/6ee08024-7f77-4698-bf0a-2a3924c213aa/ThKEe6QiO7.json"
              style={{ height: '100px', width: '100%' }}
            ></Player>
          </CardHeader>
          <CardBody className="overflow-visible border-none ">
            <div className="flex justify-center flex-col items-center">
              <p className="text-xl uppercase font-bold">Heart Disease</p>

              <h1 className="text-sm  mt-3 text-center mx-auto text-light-50 ">
                Our team of experienced cardiologists and medical experts use
                state-of-the-art technology to assess your cardiovascular health
                and design personalized treatment plans.
              </h1>
            </div>
          </CardBody>
        </Card>

        <Card shadow="none" className="py-16 px-5  border-none bg-transparent">
          <CardHeader className="pb-0 pt-2 px-4 flex-col w-full justify-center items-center">
            <Player
              autoplay
              loop
              src="https://lottie.host/9e8abf3e-4866-40b6-8739-1e2bebc7ca8b/FijIgTKGIc.json"
              style={{ height: '100px', width: '100%' }}
            ></Player>
          </CardHeader>
          <CardBody className="overflow-visible border-none ">
            <div className="flex justify-center flex-col items-center">
              <p className="text-xl uppercase font-bold">Dental Care</p>

              <h1 className="text-sm  mt-3 text-center mx-auto text-light-50 ">
                Smile with confidence as our Dental Care services cater to all
                your oral health needs.
              </h1>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default WhatWeDo;
