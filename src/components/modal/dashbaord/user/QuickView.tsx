/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import toast from 'react-hot-toast';

import useFetchQuery from '@/hooks/shared/useFetch';
import useUpdateMutate from '@/hooks/shared/useUpdateMutate';
import { imageUpload } from '@/utils/Cloudinary';
import { Districts, Upazilla, getUpazillasByDistrictId } from '@/lib/Enums';
import ImageSelector from '@/others/ImageSelector';
import Loader from '@/others/Loader';

interface UserData {
  name: string;
  email: string;

  avatar: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  role: string;
  userStatus: string;
}
export default function QuickViewModal({
  id,
  isOpen,

  isEditing,

  setIsEditing,
  onClose,
}: {
  id: string;

  isOpen: any;

  onOpen: any;
  onClose: any;
  isEditing: any;
  setIsEditing: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    data,
    isLoading: isFetching,
    isSuccess,
    refetch,
  } = useFetchQuery('/users/' + id);
  const [avatarUrl, setAvatarUrl] = useState();

  const {
    control,
    handleSubmit,
    setValue,

    clearErrors,
    formState: { errors },
    watch,
  } = useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (inputData) => {
    setIsLoading(true);
    console.log(inputData);

    mutate(inputData);
  };
  const onSuccess = () => {
    toast.success('User Updated  Successfully.');
    toggleEditing();

    onClose();

    setIsLoading(false);
  };
  const onError = (err: any) => {
    console.log(err);
    toast.error('Something Went Wrong.');

    setIsLoading(false);
  };
  const { mutate } = useUpdateMutate(
    '/users/' + data?.data?._id,
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
      console.log(data?.data);
      const upazilas = getUpazillasByDistrictId(data?.data?.district);
      setUpazilaOptions(upazilas);

      setValue('upazila', data.data.upazila);
    }
  }, [setValue, isSuccess, data, setUpazilaOptions]);
  useEffect(() => {
    refetch();
    setValue('email', data?.data?.email);
    setValue('name', data?.data?.name);
    setValue('avatar', data?.data?.avatar);
    setValue('district', data?.data?.district);
    setValue('upazila', data?.data?.upazila);
    setValue('bloodGroup', data?.data?.bloodGroup);
    setValue('role', data?.data?.role);

    console.log('first');
  }, [refetch, isOpen, data, setValue]);

  const toggleEditing = () => setIsEditing(!isEditing);

  if (!open) {
    return <></>;
  }

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onClose}
        placement="top-center"
      >
        <ModalContent className="bg-modal">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center flex flex-col gap-5 mt-8 "
          >
            <>
              <ModalBody>
                <Card className="  bg-transparent border-none   w-full  ">
                  <CardHeader className="space-y-1 p-0">
                    <CardTitle className="text-2xl mb-4">
                      {isEditing ? 'Quick Update' : ' Quick View'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-6 flex flex-col gap-4">
                    <div className="flex gap-2 w-full">
                      <div className="w-1/2">
                        <Controller
                          name="userStatus"
                          control={control}
                          defaultValue={data?.data?.userStatus}
                          render={({ field }) => (
                            <div>
                              <Select
                                {...field}
                                label="Status"
                                placeholder="Select Status "
                                isInvalid={errors.userStatus ? true : false}
                                variant={isEditing ? 'bordered' : 'underlined'}
                                isDisabled={!isEditing}
                                defaultSelectedKeys={[data.data.userStatus]}
                                errorMessage={
                                  errors.userStatus && errors.userStatus.message
                                }
                              >
                                {[
                                  {
                                    key: 'Active',
                                    value: 'active',
                                  },
                                  {
                                    key: 'Banned',
                                    value: 'banned',
                                  },
                                ].map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.key}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          )}
                        />
                      </div>
                    </div>
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
                            src={avatarUrl || data.data.avatar}
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
                            src={avatarUrl || data?.data?.avatar}
                          />
                        </div>
                      )}

                      <div className="w-full">
                        <Controller
                          name="name"
                          control={control}
                          defaultValue={data?.data?.name}
                          render={({ field }) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                isInvalid={errors.name ? true : false}
                                classNames={{
                                  errorMessage: 'text-left',
                                }}
                                errorMessage={
                                  errors.name && errors.name.message
                                }
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
                      defaultValue={data?.data?.email}
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
                    <div className="flex gap-2 w-full">
                      <div className="flex-1">
                        {' '}
                        <Controller
                          name="bloodGroup"
                          control={control}
                          defaultValue={data?.data?.bloodGroup}
                          render={({ field }) => (
                            <div>
                              <Select
                                {...field}
                                label="Blood Group"
                                placeholder="Select Blood Group"
                                isInvalid={errors.bloodGroup ? true : false}
                                variant={isEditing ? 'bordered' : 'underlined'}
                                isDisabled={!isEditing}
                                defaultSelectedKeys={[data.data.bloodGroup]}
                                errorMessage={
                                  errors.bloodGroup && errors.bloodGroup.message
                                }
                              >
                                {[
                                  'A+',
                                  'A-',
                                  'B+',
                                  'B-',
                                  'AB+',
                                  'AB-',
                                  'O+',
                                  'O-',
                                ].map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <Controller
                          name="role"
                          control={control}
                          defaultValue={data?.data?.role}
                          render={({ field }) => (
                            <div>
                              <Select
                                {...field}
                                label="Role"
                                placeholder="Select Role Group"
                                isInvalid={errors.role ? true : false}
                                variant={isEditing ? 'bordered' : 'underlined'}
                                isDisabled={!isEditing}
                                defaultSelectedKeys={[data.data.role]}
                                errorMessage={
                                  errors.role && errors.role.message
                                }
                              >
                                {['admin', 'user'].map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <div className="flex-1">
                        <Controller
                          name="district"
                          control={control}
                          defaultValue={data.data.district}
                          render={({ field }) => (
                            <div>
                              <Select
                                {...field}
                                label="District "
                                placeholder="Select District "
                                defaultSelectedKeys={[data.data.district]}
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
                          defaultValue={data.data.upazila}
                          control={control}
                          render={({ field }) => (
                            <div>
                              <Select
                                {...field}
                                label="Upazila "
                                placeholder="Upazila  "
                                defaultSelectedKeys={[data.data.upazila]}
                                isInvalid={errors.upazila ? true : false}
                                errorMessage={
                                  errors.upazila && errors.upazila.message
                                }
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
                  </CardContent>
                </Card>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-4  items-center">
                  <Button
                    disabled={isLoading}
                    color="primary"
                    variant="bordered"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Close
                  </Button>

                  {isEditing && (
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      className=" bg-red text-white"
                    >
                      Update
                    </Button>
                  )}
                  {!isEditing && (
                    <Button
                      isLoading={isLoading}
                      onClick={toggleEditing}
                      color="primary"
                      className="w-full    "
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </ModalFooter>
            </>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
