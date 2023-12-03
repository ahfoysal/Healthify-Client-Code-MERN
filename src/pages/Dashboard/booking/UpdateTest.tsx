/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from '@/components/shared/Breadcrumb';

import { Card, CardContent } from '@/components/ui/card';
import ImageSelector from '@/others/ImageSelector';
import { imageUpload } from '@/utils/Cloudinary';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { Badge, Chip, Image } from '@nextui-org/react';
import { format } from 'date-fns';
import usePostMutate from '@/hooks/shared/usePostMutate';
import useFetchQuery from '@/hooks/shared/useFetch';
import { useParams } from 'react-router-dom';
import useUpdateMutate from '@/hooks/shared/useUpdateMutate';
import useDeleteMutate from '@/hooks/shared/useDeleteMutate';
import Loader from '@/others/Loader';

type Data = {
  name: string;
  image: string;
  description: string;
  price: string;
  slots: Slots[];
};
type Slots = {
  numberOfSlots: number;
  startTime: Date | null | undefined;
  id: string;
  _id: string;
};
export default function UpdateTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const initialDate = new Date();
  initialDate.setHours(10, 0, 0);

  const [date, setDate] = useState<Date | null>(initialDate);
  const [number, setNumber] = useState('');

  const { id } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    getValues,

    clearErrors,
    formState: { errors },
  } = useForm<Data>();
  const onSuccess = (res: any) => {
    console.log(res, 'res');

    toast.success('Successfully Updated Test');

    setIsLoading(false);
  };
  const onError = (err: any) => {
    console.log(err);
    //     console.log(err?.response?.data?.message);
    toast.error(err?.response?.data?.message || 'Something went wrong');
    setIsLoading(false);
  };
  const { mutate } = useUpdateMutate('/test/' + id, onSuccess, onError);

  const onSubmit: SubmitHandler<Data> = async (userData) => {
    setIsLoading(true);

    console.log(userData);
    if (!userData.image) {
      setIsLoading(false);

      return setError('image', {
        type: 'manual',
        message: 'Image is required.',
      });
    }
    mutate(userData);
  };
  const handleFileChange = async (e: any) => {
    toast.loading('Uploading Image Please Wait...');

    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) {
      try {
        const imageUrl = await imageUpload(selectedFile);
        const { secure_url } = imageUrl;
        console.log(secure_url);

        setValue('image', secure_url);
        clearErrors('image');

        setImageUrl(secure_url);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const weekend = (date: Date) => new Date() < date;

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const addSlot = () => {
    if (!number) {
      return alert('Please enter number of slots');
    }
    if (!date) {
      return alert('Please select a date');
    }

    const newSlot = {
      numberOfSlots: Number(number),
      startTime: date,
      test: id,
    };
    createSlot(newSlot);
    console.log(newSlot);
    setDate(initialDate);
    setNumber('');
  };
  const {
    data,
    isLoading: isFetching,
    isSuccess,
  } = useFetchQuery('/test/' + id);
  const {
    data: slot,
    isLoading: isFetchingSlot,
    isSuccess: isSlotSuccess,
  } = useFetchQuery('/test/slot/' + id);
  const { mutate: deleteSlot } = useDeleteMutate(
    '/test/slot/',
    () => {
      toast.success('Slot Deleted Successfully.');
    },
    () => {
      toast.error('Something went wrong.');
    }
  );
  const { mutate: createSlot } = usePostMutate(
    '/test/slot',
    () => {
      toast.success('Slot Added Successfully.');
    },
    () => {
      toast.error('Something went wrong.');
    }
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(data);

      setValue('price', data?.data?.price);
      setValue('image', data?.data?.image);

      setValue('description', data?.data?.description);
      setValue('name', data?.data?.name);
      setValue('slots', slot?.data);
      setImageUrl(data.data.image);
    }
  }, [isSuccess, data, setValue, setImageUrl, slot]);
  useEffect(() => {
    if (isSlotSuccess) {
      setValue('slots', slot?.data);
    }
  }, [isSlotSuccess, slot, setValue]);

  if (isFetching || isFetchingSlot) {
    return <Loader />;
  }

  const minTime = new Date();
  minTime.setHours(10, 0, 0); // Set minimum time to 10:00 am

  const maxTime = new Date();
  maxTime.setHours(22, 0, 0);

  return (
    <div className="">
      <Breadcrumb title="Edit" />
      <Card className=" bg-back mt-6 border-none w-full p-0  ">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center w-full flex flex-col gap-5 mt-8 py-4 "
          >
            <p className="text-2xl text-left font-medium">Details</p>

            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: ' Name is required' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    isInvalid={errors.name ? true : false}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    errorMessage={errors.name && errors.name.message}
                    label="Test Name"
                    variant={'bordered'}
                  />
                </div>
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{ required: ' Price is required' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="number"
                    isInvalid={errors.price ? true : false}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    errorMessage={errors.price && errors.price.message}
                    label="Price"
                    variant={'bordered'}
                  />
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: ' Description is required' }}
              render={({ field }) => (
                <div>
                  <Textarea
                    {...field}
                    type="text"
                    isInvalid={errors.description ? true : false}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    errorMessage={
                      errors.description && errors.description.message
                    }
                    label="Description"
                    variant={'bordered'}
                  />
                </div>
              )}
            />

            {imageUrl ? (
              <ImageSelector handleFileChange={handleFileChange}>
                <div className="flex justify-center w-full">
                  <Image
                    src={imageUrl}
                    className=" w-full h-full max-h-[300px]"
                  />
                </div>
              </ImageSelector>
            ) : (
              <ImageSelector handleFileChange={handleFileChange}>
                <div className="flex border border-dashed border-divider rounded-lg py-4    pb-10 bg-for w-full justify-center flex-col gap-2 items-center">
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/6d7f1208-51cb-4806-b329-5bef9112765a/GokNNyYCWl.json"
                    style={{ height: '200px', width: '200px' }}
                  ></Player>
                  <p className="text-lg">Click Here To Select a Image</p>
                </div>
              </ImageSelector>
            )}

            {errors.image && (
              <p className="text-left text-danger text-sm mt-2">
                {errors.image.message}
              </p>
            )}
            <div className="flex w-full justify-end">
              <Button
                isLoading={isLoading}
                color="primary"
                className="  rounded-lg  font-bold   "
                type="submit"
              >
                Update Test
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className=" bg-back mt-6 border-none w-full p-0  ">
        <CardContent>
          <div className=" w-full flex flex-col gap-5 mt-8 py-4">
            <p className="text-2xl text-left font-medium">Slots</p>

            <div className="flex gap-3 flex-wrap">
              {getValues('slots') !== undefined &&
                getValues('slots')?.length > 0 &&
                getValues('slots')?.map(
                  (slot, index) =>
                    slot.startTime && (
                      <Badge
                        content={slot.numberOfSlots}
                        placement="top-left"
                        key={index}
                        size="md"
                        color="danger"
                      >
                        <Chip
                          onClose={() => deleteSlot(slot._id as any)}
                          variant="bordered"
                        >
                          {format(new Date(slot.startTime), 'dd,MMM hh:mm a')}
                        </Chip>
                      </Badge>
                    )
                )}
            </div>

            <div className="w-full">
              <div className="flex gap-3 justify-center items-center">
                <Input
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                  classNames={{
                    errorMessage: 'text-left',
                  }}
                  label={`Number Of Slots`}
                  defaultValue={'0'}
                  variant={'bordered'}
                />
                <div
                  className={`border-default-200 w-full h-full border-medium flex-col rounded-medium py-2 px-3 flex text-left justify-center`}
                >
                  <p className={`text-foreground-500 mb-1 text-left text-xs `}>
                    Time
                  </p>
                  <div className="flex w-full justify-between">
                    <DatePicker
                      filterDate={weekend}
                      showTimeSelect
                      className="bg-transparent flex-1 cursor-pointer focus:outline-none w-full"
                      selected={date}
                      dateFormat="dd-MM-yyyy hh:mm a"
                      onChange={handleDateChange}
                      minTime={minTime}
                      maxTime={maxTime}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  color="primary"
                  className="h-[60px]"
                  onClick={addSlot}
                >
                  Add Slot
                </Button>
              </div>
            </div>

            {errors.image && (
              <p className="text-left text-danger text-sm mt-2">
                {errors.image.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
