import Breadcrumb from '@/components/shared/Breadcrumb';
import useAxiosSecure from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Spacer, useDisclosure } from '@nextui-org/react';
import BannerListListTable from './BannerListListTable';

const BannerList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [filterValue, setFilterValue] = useState(null);
  const { onOpen } = useDisclosure();
  const Axios = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['banners', page, rowsPerPage, filterValue],
    queryFn: () =>
      Axios('/banners', {
        params: {
          page,
          limit: rowsPerPage,
          searchTerm: filterValue,
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
      <BannerListListTable
        users={users?.data?.data}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        onOpen={onOpen}
        refetch={refetch}
        filterValue={filterValue}
        isLoading={isLoading}
        setFilterValue={setFilterValue}
      />
    </div>
  );
};

export default BannerList;
