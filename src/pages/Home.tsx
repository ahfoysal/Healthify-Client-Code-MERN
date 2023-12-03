import Banner from '@/components/home/Banner';
import MeetOurDoctors from '@/components/home/MeetOurDcotor';
import Promotions from '@/components/home/Promotions';
import TopServices from '@/components/home/TopServices';
import UpcomingServices from '@/components/home/UpcomingServices';
import WhatWeDo from '@/components/home/WhatWeDo';
import { Spacer } from '@nextui-org/react';

export default function Home() {
  return (
    <div className=" ">
      <Banner />
      <div className="max-w-7xl w-[93%] mx-auto">
        <WhatWeDo />
        <TopServices />
        <Spacer className="my-20" />
        <Promotions />
        <MeetOurDoctors />
        <UpcomingServices />
      </div>
    </div>
  );
}
