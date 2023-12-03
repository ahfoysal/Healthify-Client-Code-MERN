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
import { Badge, Chip, Image, Tooltip } from '@nextui-org/react';
import { format } from 'date-fns';
import usePostMutate from '@/hooks/shared/usePostMutate';
import useDeleteMutate from '@/hooks/shared/useDeleteMutate';
import useFetchQuery from '@/hooks/shared/useFetch';

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
export default function CreateTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);
  initialDate.setHours(10, 0, 0);

  const [date, setDate] = useState<Date | null>(initialDate);
  const [number, setNumber] = useState('');
  const [testID, setTestID] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    setError,

    clearErrors,
    formState: { errors },
  } = useForm<Data>();
  const onSuccess = (res: any) => {
    console.log(res, 'res');

    toast.success('Successfully Created Test');
    setTestID(res.data.data._id);
    setIsCreated(true);
    setIsLoading(false);
  };
  const onError = (err: any) => {
    console.log(err);
    toast.error(err?.response?.data?.message || 'Something went wrong');
    setIsLoading(false);
  };
  const { mutate } = usePostMutate('/test', onSuccess, onError);

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
        // clearErrors('imageUrl');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const { mutate: createSlot } = usePostMutate(
    '/test/slot',
    () => {
      toast.success('Slot Added Successfully.');
    },
    () => {
      toast.error('Something went wrong.');
    }
  );
  const addSlot = () => {
    if (!number) {
      return alert('Please enter number of slots');
    }
    if (!date) {
      return alert('Please select a date');
    }
    if (!testID) {
      toast.error(
        'Test id not found or expired, Please add slot from  test edit page.'
      );
    }
    const newSlot = {
      numberOfSlots: Number(number),
      startTime: date,
      test: testID,
    };
    createSlot(newSlot);
    setDate(initialDate);
    setNumber('');
  };
  const { mutate: deleteSlot } = useDeleteMutate(
    '/test/slot/',
    () => {
      toast.success('Slot Deleted Successfully.');
    },
    () => {
      toast.error('Something went wrong.');
    }
  );

  const minTime = new Date();
  minTime.setHours(10, 0, 0); // Set minimum time to 10:00 am

  const maxTime = new Date();
  maxTime.setHours(22, 0, 0);
  const {
    data: slot,

    isSuccess: isSlotSuccess,
  } = useFetchQuery('/test/slot/' + testID, {}, isCreated);
  useEffect(() => {
    if (isSlotSuccess) {
      console.log(slot);

      setValue('slots', slot?.data);
    }
  }, [isSlotSuccess, slot, setValue]);
  return (
    <div className="">
      <Breadcrumb title="Create a Test" />
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

            <div></div>

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
                isDisabled={isCreated}
              >
                {isCreated ? 'Created' : ' Create Test'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card
        className={`  ${
          isCreated ? '' : ' cursor-not-allowed'
        } bg-back mt-6 pointer-events-auto  border-none w-full p-0   `}
      >
        <CardContent>
          <div className=" w-full flex  flex-col gap-5 mt-8 py-4">
            <Tooltip
              showArrow
              size="lg"
              color="danger"
              isDisabled={isCreated}
              content="Please Create Test First "
            >
              <div className="flex flex-col  md:flex-row  md:items-center gap-6">
                <p className="text-2xl text-left font-medium">Slots</p>
                {!isCreated && (
                  <p className="text-sm text-red">
                    You Need Create Test to add slot*
                  </p>
                )}
              </div>
            </Tooltip>

            <div className="flex gap-3 flex-wrap">
              {slot?.data?.map(
                (slot: any, index: number) =>
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
              <div className="flex gap-3 flex-col md:flex-row justify-center md:items-center">
                <Input
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                  classNames={{
                    errorMessage: 'text-left',
                  }}
                  isDisabled={!isCreated}
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
                      minDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                      }
                      disabled={!isCreated}
                      showTimeSelect
                      className={`bg-transparent  flex-1 ${
                        isCreated ? 'cursor-pointer' : ' cursor-not-allowed'
                      }  focus:outline-none w-full `}
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
                  isDisabled={!isCreated}
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
