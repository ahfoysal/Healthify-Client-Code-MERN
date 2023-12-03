/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
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
import { columns } from './BoookingListTableFiedls';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import useUpdateMutateWithID from '@/hooks/shared/useUpdateMutateWithID';
import SubmitTestForm from './SubmitTest';

interface TestListListTableProps {
  users: any;

  refetch: any;

  isLoading: any;
}

const SingleBookingListTable: React.FC<TestListListTableProps> = ({
  users,

  refetch,

  isLoading,
}) => {
  const { mutate: handleUpdate } = useUpdateMutateWithID(
    '/bookings/',
    () => {
      toast.success('Canceled Booking.');
      refetch();
    },
    () => {
      toast.error('Something went wrong');
    }
  );

  const renderCell = React.useCallback(
    (job: any, columnKey: any) => {
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
              name={job?.slot.test.name}
            ></User>
          );
        case 'user':
          return (
            <User
              avatarProps={{
                radius: 'lg',
                src: job?.user?.avatar,
                size: 'lg',
              }}
              description={job.user.email}
              name={job?.user.name}
            ></User>
          );

        case 'total':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">{job?.total.toFixed(2)}</p>
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
                  Cancel
                </Button>
              )}

              {job.status !== 'delivered' && (
                <SubmitTestForm
                  id={job._id}
                  email={job.user.email}
                  name={job.user.name}
                />
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleUpdate]
  );

  return (
    <div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContentPlacement="inside"
        classNames={{
          wrapper: 'max-h-fit bg-back',

          th: 'bg-for',
        }}
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
          emptyContent={isLoading ? 'Loading Bookings' : 'No Booking found'}
          items={users ? users : []}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default SingleBookingListTable;
