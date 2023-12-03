/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import useFetchQuery from '@/hooks/shared/useFetch';
import ImageSelector from '@/others/ImageSelector';
import { imageUpload } from '@/utils/Cloudinary';
import { Districts, Upazilla, getUpazillasByDistrictId } from '@/lib/Enums';
import useUpdateMutate from '@/hooks/shared/useUpdateMutate';
import Loader from '@/others/Loader';

interface UserData {
  name: string;
  email: string;
  avatar: string;
  bloodGroup: string;
  district: string;
  upazila: string;
}
const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();

  const {
    control,
    handleSubmit,
    setValue,

    clearErrors,
    formState: { errors },
    watch,
  } = useForm<UserData>();
  const { data, isLoading: isFetching, isSuccess } = useFetchQuery('/auth');

  const onSubmit: SubmitHandler<UserData> = async (inputData) => {
    setIsLoading(true);
    console.log(inputData);

    mutate(inputData);
  };
  const onSuccess = () => {
    toast.success('User Updated  Successfully.');
    toggleEditing();

    setIsLoading(false);
  };
  const onError = (err: any) => {
    console.log(err);
    toast.error('Something Went Wrong.');

    setIsLoading(false);
  };
  const { mutate } = useUpdateMutate(
    '/users/' + data?.data?.user?._id,
    onSuccess,
    onError
  );

  const handleFileChange = async (e: any) => {
    toast.loading('Uploading Image Please Wait...');

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await imageUpload(selectedFile);
        const { secure_url } = imageUrl;
        console.log(secure_url);

        setValue('avatar', secure_url);
        clearErrors('avatar');

        setAvatarUrl(secure_url);
        // clearErrors('imageUrl');
      } catch (e) {
        console.log(e);
      }
    }
  };
  const [upazilaOptions, setUpazilaOptions] = useState<Upazilla[]>([]);
  const selectedDistrict = watch('district');

  useEffect(() => {
    if (selectedDistrict) {
      console.log(selectedDistrict);
      const upazilas = getUpazillasByDistrictId(selectedDistrict);
      console.log(upazilas);
      setUpazilaOptions(upazilas);
      setValue('upazila', '');
    }
  }, [selectedDistrict, setValue, setUpazilaOptions]);
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.user);
      const upazilas = getUpazillasByDistrictId(data.data.user.district);
      setUpazilaOptions(upazilas);
      setValue('upazila', data.data.user.upazila);
    }
  }, [setValue, isSuccess, data, setUpazilaOptions]);
  const toggleEditing = () => setIsEditing(!isEditing);

  if (isFetching) {
    return <Loader />;
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="   w-full flex justify-center "
    >
      {/* <Helmet>
        <title>Add Job | Jobify</title>
        <link rel="canonical" href="https://jobify-bd6c2.web.app/" />
      </Helmet> */}
      <Card className="  bg-back p-4 md:p-10 rounded-2xl border-none   w-full  ">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-2xl mb-4">Profile </CardTitle>
          <Divider />
        </CardHeader>
        <CardContent className="mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center flex flex-col gap-5 mt-8 "
          >
            <div className="flex justify-center gap-4">
              {isEditing ? (
                <ImageSelector handleFileChange={handleFileChange}>
                  <Avatar
                    isBordered
                    color="danger"
                    size="md"
                    classNames={{
                      base: ' h-[50px] ',
                    }}
                    radius="sm"
                    src={avatarUrl || data.data.user.avatar}
                  />
                </ImageSelector>
              ) : (
                <div className="">
                  <Avatar
                    size="md"
                    classNames={{
                      base: ' h-[50px] ',
                    }}
                    radius="sm"
                    src={avatarUrl || data.data.user.avatar}
                  />
                </div>
              )}

              <div className="w-full">
                <Controller
                  name="name"
                  control={control}
                  defaultValue={data.data.user.name}
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
                        label="Name"
                        variant={isEditing ? 'bordered' : 'underlined'}
                        isReadOnly={!isEditing}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            <Controller
              name="email"
              control={control}
              defaultValue={data.data.user.email}
              rules={{ required: ' Email is required' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="email"
                    isInvalid={errors.email ? true : false}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    errorMessage={errors.email && errors.email.message}
                    label="Email"
                    variant={isEditing ? 'bordered' : 'underlined'}
                    isReadOnly={!isEditing}
                  />
                </div>
              )}
            />
            <Controller
              name="bloodGroup"
              control={control}
              defaultValue={data.data.user.bloodGroup}
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    label="Blood Group"
                    placeholder="Select Blood Group"
                    isInvalid={errors.bloodGroup ? true : false}
                    variant={isEditing ? 'bordered' : 'underlined'}
                    isDisabled={!isEditing}
                    defaultSelectedKeys={[data.data.user.bloodGroup]}
                    errorMessage={
                      errors.bloodGroup && errors.bloodGroup.message
                    }
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                      (item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      )
                    )}
                  </Select>
                </div>
              )}
            />
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="flex-1">
                <Controller
                  name="district"
                  control={control}
                  defaultValue={data.data.user.district}
                  rules={{ required: 'District is required' }}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        label="District "
                        placeholder="Select District "
                        defaultSelectedKeys={[data.data.user.district]}
                        isInvalid={errors.district ? true : false}
                        errorMessage={
                          errors.district && errors.district.message
                        }
                        variant={isEditing ? 'bordered' : 'underlined'}
                        isDisabled={!isEditing}
                      >
                        {Districts.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.bn_name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name="upazila"
                  defaultValue={data.data.user.upazila}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        label="Upazila "
                        placeholder="Upazila  "
                        defaultSelectedKeys={[data.data.user.upazila]}
                        selectionMode="single"
                        unselectable="off"
                        isInvalid={errors.upazila ? true : false}
                        errorMessage={errors.upazila && errors.upazila.message}
                        variant={isEditing ? 'bordered' : 'underlined'}
                        isDisabled={!isEditing}
                      >
                        {upazilaOptions.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.bn_name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}
                />
              </div>
            </div>

            {errors.avatar && (
              <p className="text-left text-danger text-sm mt-2">
                {errors.avatar.message}
              </p>
            )}
            {isEditing ? (
              <div className="flex gap-4">
                <Button
                  isLoading={isLoading}
                  onClick={toggleEditing}
                  color="primary"
                  size="lg"
                  className="w-full my-4  rounded-lg py-1 font-bold  "
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  size="lg"
                  className="w-full my-4  rounded-lg py-1 font-bold bg-red text-white"
                >
                  Update
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button
                  isLoading={isLoading}
                  onClick={toggleEditing}
                  color="primary"
                  size="lg"
                  className="w-full my-4  rounded-lg py-1 font-bold  "
                >
                  Edit
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfile;

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '-100vh',
  },
  exit: {
    x: '100vh',
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,

      type: 'spring',
    },
  },
};
