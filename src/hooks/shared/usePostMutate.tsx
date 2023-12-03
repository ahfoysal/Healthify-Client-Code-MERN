/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import useAxiosSecure from '../useAxios';

const usePostMutate = (
  route: string,
  onSuccess: (data: any) => void = () => {},
  onError: (error: any) => void = () => {}
) => {
  const Axios = useAxiosSecure();
  const token = Cookies.get('user');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (obj: any) =>
      Axios.post(route, obj, {
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: (mutatedData: any) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['test'] });
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });

      console.log(mutatedData);
      onSuccess(mutatedData);
    },
    onError: (err: any) => {
      console.log(err);
      onError(err);
    },
  });

  return { mutate, isPending };
};

export default usePostMutate;
