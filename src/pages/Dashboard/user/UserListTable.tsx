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
  Chip,
  User,
  Pagination,
  Select,
  SelectItem,
  Tooltip,
} from '@nextui-org/react';
import Search from '@/assets/icons/SearchIcon';
import { columns } from './UserListTableFiedls';
import { EyeFilledIcon } from '@/assets/icons/EyeFilledIcon';
import { LucidePencil, Trash2 } from 'lucide-react';
import useDeleteMutate from '@/hooks/shared/useDeleteMutate';
import toast from 'react-hot-toast';
import { DeletePopover } from '@/components/DeletePopover';

interface UserListTableProps {
  users: any;
  setPage: any;
  page: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  total: any;
  refetch: any;
  setRole: any;
  filterValue: any;
  setFilterValue: any;
  isLoading: any;
  onOpen: any;
  setCurrentUserId: any;
  setIsEditing: any;
}

const UserListTable: React.FC<UserListTableProps> = ({
  users,
  setPage,
  page,
  rowsPerPage,
  setRowsPerPage,
  setCurrentUserId,
  setIsEditing,
  total,
  refetch,
  setRole,
  filterValue,
  setFilterValue,
  onOpen,
  isLoading,
}) => {
  const pages = Math.ceil(total / rowsPerPage);
  const { mutate: deleteUser } = useDeleteMutate(
    '/users/',
    () => {
      toast.success('User Deleted Successfully.');
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

  const renderCell = React.useCallback(
    (job: any, columnKey: any) => {
      const cellValue = job[columnKey];

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{ radius: 'lg', src: job?.avatar, size: 'lg' }}
              description={job?.email}
              name={job?.name}
            ></User>
          );

        case 'bloodGroup':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">{job?.bloodGroup}</p>
            </div>
          );
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold  capitalize ">{job?.role}</p>
            </div>
          );

        case 'status':
          return (
            <Chip
              className="capitalize"
              color={job.userStatus === 'active' ? 'success' : 'danger'}
              size="sm"
              variant="flat"
            >
              {job.userStatus === 'active' ? ' Active' : 'Banned'}
            </Chip>
          );

        case 'actions':
          return (
            <div className="flex gap-1">
              <Tooltip content="View User">
                <Button
                  isIconOnly
                  // as={Link}
                  // to={'/user/' + job?._id}
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentUserId(job?._id);
                    onOpen();
                  }}
                  size="sm"
                  variant="flat"
                  className="bg-transparent"
                >
                  <EyeFilledIcon className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Quick Edit">
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentUserId(job?._id);
                    onOpen();
                  }}
                  variant="flat"
                  className="bg-transparent"
                >
                  <LucidePencil className="h-[20px] w-[20px]" />
                </Button>
              </Tooltip>
              {/* <Tooltip content="Delete"> */}
              <DeletePopover
                handleCancelClick={handleCancelClick}
                id={job._id}
                mutate={deleteUser}
                userRole={job.role}
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
              {/* </Tooltip> */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteUser, onOpen, setCurrentUserId, setIsEditing]
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
  const handleFilter = React.useCallback(
    (e: any) => {
      const selectedType = e.target.value;

      if (selectedType === 'All' || selectedType === '') {
        setPage(1);
        setRole(null);
        refetch();
      } else {
        setPage(1);
        setRole(selectedType.toLowerCase());
        refetch();
      }
    },
    [setRole, setPage, refetch]
  );
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Select
            onChange={handleFilter}
            variant="bordered"
            label="Role"
            className="min-w-[80px] w-1/3   hidden md:flex"
            labelPlacement="inside"
          >
            {['All', 'Admin', 'User'].map((cat) => (
              <SelectItem className="m-0" key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </Select>
          <Input
            isClearable
            className="w-full "
            placeholder="Search by name, email, blood ,role..."
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
  }, [
    filterValue,
    handleFilter,
    onClear,
    onSearchChange,
    onRowsPerPageChange,
    total,
  ]);

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
          emptyContent={isLoading ? 'Loading Users' : 'No User found'}
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
export default UserListTable;
