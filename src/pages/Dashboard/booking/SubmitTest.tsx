/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import toast from 'react-hot-toast';

import emailjs from '@emailjs/browser';
import { pdfUpload } from '@/utils/Cloudinary';
import useUpdateMutateWithID from '@/hooks/shared/useUpdateMutateWithID';

export default function SubmitTestForm({ id }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any>();

  emailjs.init('EAfi-a877NAIhgLbE');
  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (!data.result) {
      setIsLoading(false);

      return setError('result', {
        type: 'manual',
        message: 'Result is required.',
      });
    }
    data.id = id;
    data.status = 'delivered';
    console.log(data);
    handleUpdate(data);
  };

  const { mutate: handleUpdate } = useUpdateMutateWithID(
    '/bookings/',
    () => {
      toast.success('Result Submitted Successfully.');
      onClose();
    },
    () => {
      toast.error('Something went wrong');
    }
  );

  const handleFileChange = async (event: any) => {
    clearErrors('result');
    const file = event.target.files[0];
    console.log(event.target.files);
    if (!file) {
      return setError('result', {
        type: 'manual',
        message: 'Something Went Wrong,  Please Choose Again.',
      });
    }
    setIsLoading(true);
    toast.loading('Uploading Result Please Wait...');

    console.log(file);

    if (file) {
      try {
        const imageUrl = await pdfUpload(file);
        console.log(imageUrl);
        const { secure_url } = imageUrl;
        console.log(secure_url);

        setValue('result', secure_url);
        setIsLoading(false);

        clearErrors('result');
      } catch (e) {
        console.log(e);
        setIsLoading(false);

        toast.error(
          'Something went wrong while uploading CV. PLease try again.'
        );
      }
    }
  };

  const handleApply = () => {
    onOpen();
  };

  return (
    <div>
      <Button
        onPress={handleApply}
        size="sm"
        variant="solid"
        className="font-medium"
        color="primary"
      >
        Submit Test Result
      </Button>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onClose}
        placement="top-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Something A Test Result
              </ModalHeader>
              <ModalBody>
                <Controller
                  name="feedback"
                  defaultValue={''}
                  rules={{
                    required: 'Feedback is required',
                  }}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Textarea
                        {...field}
                        label="Feedback"
                        required
                        placeholder="Enter Feedback"
                        type="text"
                        isInvalid={errors.feedback ? true : false}
                        errorMessage={
                          errors.feedback && (errors.feedback.message as any)
                        }
                        variant="bordered"
                      />
                    </div>
                  )}
                />

                <Input
                  type="file"
                  label="Upload Result"
                  placeholder="file"
                  required
                  variant="bordered"
                  className="py-2"
                  isInvalid={errors.result ? true : false}
                  errorMessage={errors.result && (errors.result.message as any)}
                  onChange={handleFileChange}
                  accept=".pdf, .doc, .docx" // Define accepted file types
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isLoading}
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                  color="primary"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}
