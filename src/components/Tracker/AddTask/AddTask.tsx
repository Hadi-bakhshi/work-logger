'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AddTaskFormData, addTaskFormSchema } from './AddTaskFormSchema';
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
  useDisclosure,
} from '@nextui-org/react';
import { parseAbsoluteToLocal, Time } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { useCategoryStore } from '@/lib/store/categories';
import { getContrast } from '@/utils';
import toast from 'react-hot-toast';
import { Task, useTaskStore } from '@/lib/store/tasks';
const AddTask = () => {
  const categoryList = useCategoryStore((state) => state.categories);
  const addToTask = useTaskStore((state) => state.add);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm<AddTaskFormData>({
    resolver: yupResolver(addTaskFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      date: new Date(),
      from: new Time(new Date().getHours(), new Date().getMinutes()) as unknown as string,
      to: '',
      category: {
        id: '',
        color: '',
        name: '',
      },
      description: '',
    },
  });

  const onSubmit = (data: AddTaskFormData) => {
    console.log({ data });
    addToTask(data as unknown as Task);
    reset();
    toast.success("You're task has been created");
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Create New Task
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {() => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className='flex flex-col gap-1'>{"Let's build a new task 😊"}</ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name='title'
                  render={({ field }) => {
                    return (
                      <Input
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        label='Title'
                        type='text'
                        // placeholder='Enter name of category'
                        variant='flat'
                        errorMessage={errors.title?.message}
                        isInvalid={Boolean(errors.title?.message)}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='date'
                  render={({ field }) => {
                    return (
                      <I18nProvider locale='en-IR-u-ca-persian'>
                        <DatePicker
                          // dir='rtl'
                          showMonthAndYearPickers
                          value={parseAbsoluteToLocal(field.value.toISOString() || new Date().toISOString())}
                          onChange={(dateValue) => field.onChange(dateValue)}
                          label='Date'
                          granularity='day'
                          // type='text'
                          // placeholder='Enter name of category'
                          variant='flat'
                          errorMessage={errors.date?.message}
                          isInvalid={Boolean(errors.date?.message)}
                        />
                      </I18nProvider>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='from'
                  render={({ field }) => {
                    return (
                      // <I18nProvider locale='en-IR-u-ca-persian'>
                      <TimeInput
                        // dir='rtl'
                        // value={!field.value ? new Time(new Date().getHours(), new Date().getMinutes()) : field.value}
                        value={new Time((field.value as any).hour, (field.value as any).minute)}
                        onChange={(dateValue) => field.onChange(dateValue)}
                        label='From'
                        hourCycle={24}
                        // type='text'
                        // placeholder='Enter name of category'
                        variant='flat'
                        errorMessage={errors.from?.message}
                        isInvalid={Boolean(errors.from?.message)}
                      />
                      // </I18nProvider>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='to'
                  render={({ field }) => {
                    return (
                      // <I18nProvider locale='en-IR-u-ca-persian'>
                      <TimeInput
                        // dir='rtl'
                        // value={!field.value ? new Time(new Date().getHours(), new Date().getMinutes()) : field.value}
                        value={field.value ? new Time((field.value as any).hour, (field.value as any).minute) : null}
                        onChange={(dateValue) => field.onChange(dateValue)}
                        label='To'
                        hourCycle={24}
                        // type='text'
                        // placeholder='Enter name of category'
                        variant='flat'
                        errorMessage={errors.to?.message}
                        isInvalid={Boolean(errors.to?.message)}
                      />
                      // </I18nProvider>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='category'
                  render={({ field }) => {
                    return (
                      <Select
                        // dir='rtl'
                        // value={!field.value ? new Time(new Date().getHours(), new Date().getMinutes()) : field.value}
                        // selectedKeys={field.value.id}
                        value={field.value.id}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          const foundItem = categoryList?.find((item) => item.id === e.target.value);
                          if (foundItem) {
                            setValue('category', foundItem);
                            clearErrors('category');
                          }
                        }}
                        label='Category'
                        // type='text'
                        // placeholder='Enter name of category'
                        variant='flat'
                        errorMessage={'Category selection is required'}
                        isInvalid={errors.category ? true : false}
                      >
                        {categoryList?.map((category) => {
                          return (
                            <SelectItem
                              key={category.id}
                              style={{
                                backgroundColor: category.color || '#ffffff',
                                color: category.color ? getContrast(category.color) : '#000',
                                textAlign: 'center',
                                borderRadius: '0.5rem',
                                // display: 'block',
                              }}
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </Select>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name='description'
                  render={({ field }) => {
                    return (
                      <Textarea
                        maxRows={3}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        label='Description'
                        // placeholder='Enter name of category'
                        variant='flat'
                        errorMessage={errors.description?.message}
                        isInvalid={Boolean(errors.description?.message)}
                      />
                    );
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button type='submit' variant='flat' color='primary'>
                  add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTask;
