import { Icons } from '@/assets/icons/Icons';
import useFetchQuery from '@/hooks/shared/useFetch';
import BookingsChart from './user/BookingsChart';
import { Separator } from '@radix-ui/react-separator';
import Loader from '@/others/Loader';

export default function DashboardHome() {
  const { data, isLoading, isSuccess } = useFetchQuery('/analysis');
  if (isSuccess) {
    console.log(data.data);
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-7xl md:w-full w-[93%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Users"
          total={data.data.totalUsers}
          newToday={data.data.todayNewUsers}
        />
        <Card
          title="Total Tests"
          total={data.data.totalTests}
          newToday={data.data.totalNewTests}
        />
        <Card
          title="Total Bookings"
          total={data.data.totalBookings}
          newToday={data.data.todayBookings}
        />
        <Card
          title="Total Booking Amount"
          total={data.data.totalBookingAmount}
          newToday={data.data.todayTotalBookingAmount}
        />
      </div>
      <div className="grid mt-6  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-back rounded-2xl ">
          <div className="p-6">
            <p className="font-medium mb-5">Bookings Summary</p>
            <BookingsChart
              cancelled={data.data.cancelledBookings}
              delivered={data.data.deliveredBookings}
              pending={data.data.pendingBookings}
            />
          </div>
          <Separator className="border border-dashed border-divider " />
          <div className="py-6 px-6">
            <ul className="flex justify-between list-inside list-disc">
              <li className="text-green">Delivered</li>
              <li className="text-warning"> Pending</li>
              <li className="text-red">Cancelled</li>
            </ul>
          </div>
        </div>
        <div className="bg-back rounded-2xl p-6">
          <p className="font-medium mb-5">Top Tests</p>
          {/* <BookingsChart cancelled={5} delivered={5} pending={5} /> */}
        </div>
        <div className="bg-back rounded-2xl p-6">
          <p className="font-medium mb-5">Top Patients</p>
        </div>
      </div>
    </div>
  );
}
const Card = ({
  title,
  total,
  newToday,
}: {
  title: string;
  total: number;
  newToday: number;
}) => {
  return (
    <div className="bg-back rounded-2xl p-6">
      <p>{title}</p>
      <div className="flex justify-between mt-5 items-center">
        <p className="text-xl md:text-4xl font-semibold">{total}</p>

        {newToday && (
          <p className="flex  justify-center items-center gap-2">
            <Icons.increase className="h-4 w-4  text-green" />{' '}
            <span className="text-sm font-medium"> +{newToday}</span>
          </p>
        )}
      </div>
    </div>
  );
};
