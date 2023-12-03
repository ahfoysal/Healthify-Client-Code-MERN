import Breadcrumb from '@/components/shared/Breadcrumb';
import useAxiosSecure from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserListTable from './UserListTable';
import { Spacer, useDisclosure } from '@nextui-org/react';
import QuickViewModal from '@/components/modal/dashbaord/user/QuickView';

const UserList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [filterValue, setFilterValue] = useState(null);
  const [role, setRole] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Axios = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  const {
    data: users,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['users', role, page, rowsPerPage, filterValue],
    queryFn: () =>
      Axios('/users', {
        params: {
          page,
          limit: rowsPerPage,
          searchTerm: filterValue,
          role,
        },
      }),
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(users.data.data[0]);
      setRowsPerPage(users?.data?.meta?.limit);
      setPage(users?.data?.meta?.page);
      setTotal(users?.data?.meta?.total);
    }
  }, [isSuccess, users]);

  return (
    <div>
      <Breadcrumb title="List" />
      <Spacer className="my-10" />
      <UserListTable
        users={users?.data?.data}
        page={page}
        setPage={setPage}
        setCurrentUserId={setCurrentUserId}
        setIsEditing={setIsEditing}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        onOpen={onOpen}
        refetch={refetch}
        setRole={setRole}
        filterValue={filterValue}
        isLoading={isLoading}
        setFilterValue={setFilterValue}
      />
      <QuickViewModal
        isOpen={isOpen}
        onClose={onClose}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onOpen={onOpen}
        id={currentUserId}
      />
    </div>
  );
};

export default UserList;
