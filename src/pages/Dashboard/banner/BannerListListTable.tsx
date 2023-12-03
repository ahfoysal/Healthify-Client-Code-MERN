/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
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
  Switch,
} from '@nextui-org/react';
import Search from '@/assets/icons/SearchIcon';
import { columns } from './BannerListListTableFiedls';

import useDeleteMutate from '@/hooks/shared/useDeleteMutate';
import toast from 'react-hot-toast';
import { DeletePopover } from '@/components/DeletePopover';
import { Trash2 } from 'lucide-react';
import useUpdateMutateWithID from '@/hooks/shared/useUpdateMutateWithID';

interface BannerListListTableProps {
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
  onOpen: any;
}

const BannerListListTable: React.FC<BannerListListTableProps> = ({
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
  const { mutate: deleteUser } = useDeleteMutate(
    '/banners/',
    () => {
      toast.success('Test Deleted Successfully.');
    },
    () => {
      toast.error('Something went wrong.');
    }
  );

  const trashButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleCancelClick = () => {
    if (trashButtonRef.current) {
      trashButtonRef.current.click();
    }
  };
  const { mutate } = useUpdateMutateWithID(
    '/banners/',
    () => {
      toast.success('Banner Activated.');
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
        case 'name':
          return (
            <User
              avatarProps={{ radius: 'lg', src: job?.image, size: 'lg' }}
              name={job?.title}
            ></User>
          );

        case 'couponCode':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">{job?.couponCode}</p>
            </div>
          );
        case 'discountRate':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">{job?.discountRate}</p>
            </div>
          );
        case 'isActive':
          return (
            <div className="flex flex-col">
              <Switch
                color="success"
                isDisabled={job.isActive}
                onChange={() => {
                  console.log(job._id);
                  toast.loading('Banner Switching Please Wait', {
                    duration: 1000,
                  });
                  mutate({ id: job?._id });
                  refetch();
                }}
                isSelected={job.isActive}
              />
            </div>
          );

        case 'actions':
          return (
            <div className="flex gap-1">
              <DeletePopover
                handleCancelClick={handleCancelClick}
                id={job._id}
                mutate={deleteUser}
              >
                <Button
                  isIconOnly
                  ref={trashButtonRef}
                  size="sm"
                  variant="flat"
                  className="bg-transparent"
                >
                  <Trash2 className="text-red h-[20px] w-[20px]" />
                </Button>
              </DeletePopover>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteUser, mutate, refetch]
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
            placeholder="Search by name..."
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
          emptyContent={isLoading ? 'Loading Banners' : 'No Banner found'}
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
export default BannerListListTable;
