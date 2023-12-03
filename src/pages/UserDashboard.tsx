import { useNavigate, useParams } from 'react-router-dom';

import { Tab, Tabs } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import UserProfile from '@/components/userDashbaord/Profile';
import UpcomingAppointments from '@/components/userDashbaord/UpcomingAppointments';
import TestResults from '@/components/userDashbaord/TestResults';

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(id);
  useEffect(() => {
    setSelected(id);
  }, [id]);

  const handleChange = (active: any) => {
    setSelected(active);
    navigate('/dashboard/' + active, { replace: true });
  };
  return (
    <div className="  w-[93%]  flex flex-col md:flex-row gap-10 mx-auto  min-h-[600px] ">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        onSelectionChange={handleChange}
        selectedKey={selected}
        classNames={{
          tabList:
            'md:gap-2 gap-2 w-full  relative  px-2  border-divider flex  md:flex-col  overflow-x-scroll  justify-start items-start       ',
          cursor: '  bg-danger snap-y w-full  ',
          tab: 'w-ful px-0  h-12  justify-start text-left',
          tabContent: ' group-data-[selected=true]:text-red  ',
        }}
      >
        <Tab
          key="appointments"
          title={
            <div className="flex items-start group-data-[selected=true]:text-danger hover:text-danger  text-lg text-primary  mx-3">
              <span>Upcoming Appointments</span>
            </div>
          }
        >
          <UpcomingAppointments />
        </Tab>
        <Tab
          key="test-results"
          title={
            <div className="flex items-start text-lg  group-data-[selected=true]:text-danger hover:text-danger text-primary   mx-3">
              <span> Test Results</span>
            </div>
          }
        >
          <TestResults />
        </Tab>
        <Tab
          key="profile"
          title={
            <div className="flex items-start text-lg text-primary group-data-[selected=true]:text-danger  hover:text-danger   md:mx-3  w-full">
              <span>Profile</span>
            </div>
          }
        >
          <UserProfile />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
