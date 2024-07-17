'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AddTaskFormData, addTaskFormSchema } from './AddTaskFormSchema';
import { DatePicker, Input, Select, SelectItem, TimeInput } from '@nextui-org/react';
import { parseAbsoluteToLocal, parseDate, parseTime, Time } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { useCategoryStore } from '@/lib/store/categories';
const AddTask = () => {
  const categoryList = useCategoryStore((state) => state.categories);
  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
    reset,
  } = useForm<AddTaskFormData>({
    resolver: yupResolver(addTaskFormSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      from: '',
      to: '',
      category: {
        id: '',
        color: '',
        name: '',
      },
      description: '',
    },
  });

  /*!
   * Get the contrasting color for any hex color
   * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
   * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
   * @param  {String} A hexcolor value
   * @return {String} The contrasting color (black or white)
   */
  var getContrast = function (hexcolor: string) {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
      hexcolor = hexcolor
        .split('')
        .map(function (hex) {
          return hex + hex;
        })
        .join('');
    }

    // Convert to RGB value
    var r = parseInt(hexcolor.substring(0, 2), 16);
    var g = parseInt(hexcolor.substring(2, 2), 16);
    var b = parseInt(hexcolor.substring(4, 2), 16);

    // Get YIQ ratio
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? 'black' : 'white';
  };

  return (
    <section>
      <form>
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
                value={parseAbsoluteToLocal(field.value || new Date().toISOString())}
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
                value={field.value ? parseAbsoluteToLocal(field.value) : null}
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
                value={field.value}
                onChange={(e) => {
                  console.log(e.target.value);
                  field.onChange(e.target);
                }}
                label='Category'
                // type='text'
                // placeholder='Enter name of category'
                variant='flat'
                errorMessage={errors.to?.message}
                isInvalid={Boolean(errors.to?.message)}
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
      </form>
    </section>
  );
};

export default AddTask;
