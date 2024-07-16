import * as yup from 'yup';

export const createCategoryFormSchema = yup
  .object({
    name: yup.string().required('You should provide name for category'),
    color: yup.string().nullable(),
  })
  .required();

export type CreateCategoryFormData = yup.InferType<typeof createCategoryFormSchema>;
