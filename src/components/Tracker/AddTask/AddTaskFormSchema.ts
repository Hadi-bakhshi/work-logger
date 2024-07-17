import * as yup from 'yup';

export const addTaskFormSchema = yup.object({
  title: yup.string().required('Title should be specified'),
  date: yup.date().required('Date is required and should be specified'),
  from: yup.string().required('Starting time is required'),
  to: yup.string().nullable(),
  category: yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    color: yup.string().nullable(),
  }),
  description: yup.string().nullable(),
});
export type AddTaskFormData = yup.InferType<typeof addTaskFormSchema>;
