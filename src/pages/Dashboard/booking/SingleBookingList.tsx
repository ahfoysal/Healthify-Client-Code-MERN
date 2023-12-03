import Breadcrumb from '@/components/shared/Breadcrumb';
import useAxiosSecure from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Spacer } from '@nextui-org/react';
import Cookies from 'js-cookie';
import SingleBookingListTable from './SingleBookingListTable';
import { useParams } from 'react-router-dom';

const SingleBookingList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const Axios = useAxiosSecure();
  const token = Cookies.get('user');
  const { id } = useParams();
  const {
    data: users,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['bookings', page, rowsPerPage],
    queryFn: () =>
      Axios('/bookings/test/' + id, {
        params: {
          page,
          limit: rowsPerPage,
        },
        headers: {
          Authorization: token,
        },
      }),
  });
  useEffect(() => {
    if (isSuccess) {
      setRowsPerPage(users?.data?.meta?.limit);
      setPage(users?.data?.meta?.page);
    }
  }, [isSuccess, users]);

  return (
    <div>
      <Breadcrumb title="List" />
      <Spacer className="my-10" />
      <SingleBookingListTable
        users={users?.data?.data}
        refetch={refetch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SingleBookingList;
