/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  User,
  Pagination,
  Chip,
} from '@nextui-org/react';
import Search from '@/assets/icons/SearchIcon';
import { columns } from './BoookingListTableFiedls';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import useUpdateMutateWithID from '@/hooks/shared/useUpdateMutateWithID';
import SubmitTestForm from './SubmitTest';

interface TestListListTableProps {
  users: any;
  setPage: any;
  page: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  total: any;
  refetch: any;
  filterValue: any;
  setFilterValue: any;
  isLoading: any;
}

const BookingListTable: React.FC<TestListListTableProps> = ({
  users,
  setPage,
  page,
  rowsPerPage,
  setRowsPerPage,
  total,
  refetch,

  filterValue,
  setFilterValue,

  isLoading,
}) => {
  const pages = Math.ceil(total / rowsPerPage);

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
              name={job?.slot?.test?.name}
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
              description={job?.user?.email}
              name={job?.user?.name}
            ></User>
          );

        case 'total':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">{job?.total.toFixed(0)}</p>
            </div>
          );
        case 'date':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">
                {format(
                  new Date(job?.slot?.startTime || null),
                  'dd,MMM hh:mm a'
                )}
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

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  const onRowsPerPageChange = React.useCallback(
    (e: any) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const onSearchChange = React.useCallback(
    (value: any) => {
      if (value) {
        setFilterValue(value);
        console.log(value);
        setPage(1);
      } else {
        setFilterValue('');
      }
    },
    [setFilterValue, setPage]
  );

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, [setPage, setFilterValue]);

  const onPaginate = React.useCallback(
    (value: any) => {
      console.log(value);
      setPage(value);
      refetch();
    },
    [setPage, refetch]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full "
            placeholder="Search by email..."
            variant="bordered"
            startContent={<Search />}
            value={filterValue || ''}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {total} User
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onClear, onSearchChange, onRowsPerPageChange, total]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={isLoading ? 1 : page}
            total={isLoading ? 10 : pages}
            onChange={onPaginate}
          />
        }
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, isLoading, onNextPage, onPreviousPage, onPaginate]);

  return (
    <div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
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
export default BookingListTable;
