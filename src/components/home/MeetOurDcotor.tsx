import { Card, CardBody, CardFooter, Image, Spacer } from '@nextui-org/react';

const MeetOurDoctors = () => {
  return (
    <div className="my-20">
      <h1 className="text-3xl font-bold text-center">Meet Our Doctors</h1>
      <Spacer className="my-6" />
      <h1 className="text-sm  max-w-lg md:max-w-3xl text-center mx-auto text-primary/60 ">
        Meet our exceptional team of specialist doctors, dedicated to providing
        top-notch healthcare services at Health Plus. Trust in their knowledge
        and experience to lead you towards a healthier and happier life.
      </h1>
      <Spacer className=" my-20" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <Card
          shadow="none"
          className="py-0 px-5 shadow-[500px]  border-none bg-transparent"
        >
          <CardBody className="overflow-visible p-0 relative">
            <Image
              shadow="none"
              radius="lg"
              loading="lazy"
              width="100%"
              alt={
                'https://alkaison.github.io/Health-Plus/static/media/profile-1.0261bb4efe7a9075c56a.png'
              }
              className="w-full object-cover h-[350px]"
              src={
                'https://alkaison.github.io/Health-Plus/static/media/profile-1.0261bb4efe7a9075c56a.png'
              }
            />
          </CardBody>
          <CardFooter className="justify-between">
            <h1 className="text-xl font-medium ">Dr. Kathryn Murphy</h1>
            <p className="text-light-50">General Surgeons</p>
          </CardFooter>
        </Card>
        <Card
          shadow="lg"
          className="py-0 px-5 shadow-[500px]  border-none bg-transparent"
        >
          <CardBody className="overflow-visible p-0 relative">
            <Image
              shadow="none"
              radius="lg"
              loading="lazy"
              width="100%"
              alt={
                'https://alkaison.github.io/Health-Plus/static/media/profile-4.3c44185ab9c84614038f.png'
              }
              className="w-full object-cover h-[350px]"
              src={
                'https://alkaison.github.io/Health-Plus/static/media/profile-4.3c44185ab9c84614038f.png'
              }
            />
          </CardBody>
          <CardFooter className="justify-between">
            <h1 className="text-xl font-medium "> Dr. Albert Flores</h1>
            <p className="text-light-50">Hematologists</p>
          </CardFooter>
        </Card>
        <Card
          shadow="none"
          className="py-0 px-5 shadow-[500px]  border-none bg-transparent"
        >
          <CardBody className="overflow-visible p-0 relative">
            <Image
              shadow="none"
              radius="lg"
              loading="lazy"
              width="100%"
              alt={
                'https://alkaison.github.io/Health-Plus/static/media/profile-2.4752a9db34458eeffcfa.png'
              }
              className="w-full object-cover h-[350px]"
              src={
                'https://alkaison.github.io/Health-Plus/static/media/profile-2.4752a9db34458eeffcfa.png'
              }
            />
          </CardBody>
          <CardFooter className="justify-between">
            <h1 className="text-xl font-medium ">Dr. Jacob Jones</h1>
            <p className="text-light-50">Endocrinologists</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MeetOurDoctors;
