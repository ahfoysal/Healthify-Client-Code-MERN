/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  User,
  Chip,
} from '@nextui-org/react';
import { format } from 'date-fns';

import { columns } from './UpcomingAppointmentsFiedls';
import useFetchQuery from '@/hooks/shared/useFetch';
import useUpdateMutateWithID from '@/hooks/shared/useUpdateMutateWithID';
import toast from 'react-hot-toast';

export default function UpcomingAppointments() {
  const [bookings, setBookings] = useState([]);
  const { data, isLoading, isSuccess } = useFetchQuery('/auth');
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.user.bookings);
      const futureBookings = data.data.user.bookings
        .filter((booking: any) => {
          if (!booking.slot || booking.status === 'delivered') {
            return false;
          }

          const startTime = new Date(booking.slot.startTime);
          const currentTime = new Date();

          return startTime > currentTime;
        })
        .reverse();

      setBookings(futureBookings);
    }
  }, [data, isSuccess]);

  const { mutate: handleUpdate } = useUpdateMutateWithID(
    '/bookings/',
    () => {
      toast.success('Canceled Booking.');
      // refetch();
    },
    () => {
      toast.error('Something went wrong');
    }
  );
  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const job = item;
    const cellValue = job[columnKey];

    switch (columnKey) {
      case 'details':
        return (
          <User
            avatarProps={{
              radius: 'lg',
              src: job?.slot?.test?.image,
              size: 'lg',
            }}
            name={job?.slot?.test?.name}
          ></User>
        );

      case 'Price':
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize ">{job?.total}</p>
          </div>
        );
      case 'date':
        return (
          <div className="flex flex-col">
            <p className="text-bold  capitalize ">
              {format(new Date(job.slot.startTime), 'dd,MMM hh:mm a')}
            </p>
          </div>
        );

      case 'status':
        return (
          <Chip
            className="capitalize"
            color={
              job.status === 'cancelled'
                ? 'danger'
                : job.status === 'pending'
                ? 'warning'
                : 'success'
            }
            size="sm"
            variant="flat"
          >
            {job.status}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex gap-1">
            {job.status === 'pending' && (
              <Button
                onPress={() =>
                  handleUpdate({ id: job._id, status: 'cancelled' })
                }
                size="sm"
                variant="solid"
                className="bg-red"
              >
                Cancel Booking
              </Button>
            )}
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-3 ">
          <div className="div">
            <span className=" text-xl"> Upcoming Appointments</span>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContentPlacement="outside"
      classNames={{
        wrapper: 'max-h-fit bg-back',

        th: 'bg-for',
      }}
      topContent={topContent}
      topContentPlacement="inside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={'center'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        emptyContent={isLoading ? 'Loading Bookings' : 'No Bookings found'}
        items={bookings}
      >
        {(item: any) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
