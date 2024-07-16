'use client';

import { useCategoryStore } from '@/lib/store/categories';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { CreateCategoryFormData, createCategoryFormSchema } from './CreateCategoryFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FocusEvent } from 'react';
import toast from 'react-hot-toast';

const CreateCategory = () => {
  const addCategory = useCategoryStore((state) => state.add);
  const checkCategoryName = useCategoryStore((state) => state.checkIfCategoryExist);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
    reset,
  } = useForm<CreateCategoryFormData>({
    resolver: yupResolver(createCategoryFormSchema),
    defaultValues: {
      color: '',
      name: '',
    },
  });

  const duplicateCheckerHandler = (e: FocusEvent<HTMLInputElement | any>) => {
    const isExist = checkCategoryName(e.target.value);
    if (isExist) {
      setError('name', { message: 'already exist', type: 'value' });
    } else {
      clearErrors('name');
    }
  };

  const onSubmit = (data: CreateCategoryFormData) => {
    addCategory(data.name, data.color ?? null);
    toast.success('Now you have one more category');
    reset();
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Create New category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className='flex flex-col gap-1'>{"Let's build a new category 😊"}</ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name='name'
                  render={({ field }) => {
                    return (
                      <Input
                        autoFocus
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={duplicateCheckerHandler}
                        label='Name'
                        type='text'
                        placeholder='Enter name of category'
                        variant='flat'
                        errorMessage={errors.name?.message}
                        isInvalid={Boolean(errors.name?.message)}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='color'
                  render={({ field }) => {
                    return (
                      <Input
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={duplicateCheckerHandler}
                        label='Color (optional)'
                        type='color'
                        placeholder='choose color if you want'
                        variant='flat'
                        errorMessage={errors.color?.message}
                        isInvalid={Boolean(errors.color?.message)}
                      />
                    );
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' type='submit' isDisabled={Boolean(errors.name?.message)}>
                  Create
                </Button>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCategory;
