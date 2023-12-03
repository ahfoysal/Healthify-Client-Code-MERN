import Breadcrumb from '@/components/shared/Breadcrumb';
import useAxiosSecure from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Spacer } from '@nextui-org/react';
import BookingListTable from './BookingListTable';
import Cookies from 'js-cookie';

const BookingList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [filterValue, setFilterValue] = useState(null);
  const Axios = useAxiosSecure();

  const token = Cookies.get('user');

  const {
    data: users,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['bookings', page, rowsPerPage, filterValue],
    queryFn: () =>
      Axios('/bookings', {
        params: {
          page,
          limit: rowsPerPage,
          searchTerm: filterValue,
        },
        headers: {
          Authorization: token,
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
      <BookingListTable
        users={users?.data?.data}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        refetch={refetch}
        filterValue={filterValue}
        isLoading={isLoading}
        setFilterValue={setFilterValue}
      />
    </div>
  );
};

export default BookingList;
