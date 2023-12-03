/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from '@/components/shared/Breadcrumb';

import { Card, CardContent } from '@/components/ui/card';
import ImageSelector from '@/others/ImageSelector';
import { imageUpload } from '@/utils/Cloudinary';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Image } from '@nextui-org/react';

import usePostMutate from '@/hooks/shared/usePostMutate';

type Data = {
  title: string;
  image: string;
  description: string;
  couponText: string;
  couponCode: string;
  discountRate: string;
};

export default function CreateBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // const {
  //   data,

  //   isSuccess,
  //   isLoading,
  // } = useFetchPhotosQuery('');

  // if (isSuccess) {
  //   console.log(data);
  // }
  // if (isLoading) {
  //   return <PhotoSkeleton />;
  // }
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

    setIsLoading(false);
  };
  const onError = (err: any) => {
    console.log(err);
    //     console.log(err?.response?.data?.message);
    toast.error(err?.response?.data?.message || 'Something went wrong');
    setIsLoading(false);
  };
  const { mutate } = usePostMutate('/banners', onSuccess, onError);

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

  return (
    <div className="">
      <Breadcrumb title="Create a Banner" />
      <Card className=" bg-back mt-6 border-none w-full p-0  ">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center w-full flex flex-col gap-5 mt-8 py-4 "
          >
            <p className="text-2xl text-left font-medium">Details</p>

            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: ' Title is required' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    isInvalid={errors.title ? true : false}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    errorMessage={errors.title && errors.title.message}
                    label="Banner Title"
                    variant={'bordered'}
                  />
                </div>
              )}
            />

            <div className="flex gap-2">
              <div className="flex-1">
                <Controller
                  name="couponCode"
                  control={control}
                  rules={{ required: ' Coupon Code is required' }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="text"
                        isInvalid={errors.couponCode ? true : false}
                        classNames={{
                          errorMessage: 'text-left',
                        }}
                        errorMessage={
                          errors.couponCode && errors.couponCode.message
                        }
                        label="Coupon Code"
                        variant={'bordered'}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="discountRate"
                  control={control}
                  rules={{ required: ' Discount Rate is required' }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="number"
                        isInvalid={errors.discountRate ? true : false}
                        classNames={{
                          errorMessage: 'text-left',
                        }}
                        endContent={<>%</>}
                        errorMessage={
                          errors.discountRate && errors.discountRate.message
                        }
                        label="Discount Rate"
                        variant={'bordered'}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <Controller
              name="couponText"
              control={control}
              rules={{ required: ' Code Promo Text is required' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    isInvalid={errors.couponText ? true : false}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    errorMessage={
                      errors.couponText && errors.couponText.message
                    }
                    label="Code Promo Text"
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

            <div className="flex w-full justify-end">
              <Button
                isLoading={isLoading}
                color="primary"
                className="  rounded-lg  font-bold   "
                type="submit"
              >
                Create Banner
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
