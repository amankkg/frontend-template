import { H1 } from 'atoms';
import styled from '@emotion/styled';
import { defineMessage, t } from '@lingui/macro';
import { appendErrors, useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  Radio,
  FormGroup,
} from '@material-ui/core';

const variant1 = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

const variant2 = z.object({
  phone: z.string().nonempty(),
  pin: z.string().nonempty(),
  confirmPin: z.string().nonempty(),
});

const variant1Catched = variant1.catchall(z.any());
const variant2Catched = variant2.catchall(z.any());

const schema = z
  .object({
    name: z.string(),
    age: z.string(),
    Checkbox: z.boolean(),
    // type: z.string().union(['variant1', 'variant2']),
    type: z.union([z.string(), z.undefined()]),
    data: z.union([variant1, variant2]),
  })
  .refine((d) =>
    d.type === 'variant1'
      ? variant1Catched.parse(d.data)
      : variant2Catched.parse(d.data)
  );

export const PageB = () => {
  const { register, errors, reset, handleSubmit, control, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <>
      <H1>{t`page b content`}</H1>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          inputRef={register}
          name='name'
          label={`Name`}
          size={'small'}
          // error={!!errors.name}
          // helperText={errors.name?.message}
        />

        <TextField
          inputRef={register}
          name='age'
          label={`Age`}
          size={'small'}
          type='number'
          // error={!!errors.age}
          // helperText={errors.age?.message}
        />

        <FormControlLabel
          control={
            <Controller
              name='Checkbox'
              control={control}
              defaultValue={false}
              render={(props) => (
                <Checkbox
                  onChange={(e) => props.onChange(e.target.checked)}
                  checked={props.value}
                  color='primary'
                />
              )}
            />
          }
          label='CheckBox'
        />

        <Controller
          as={
            <RadioGroup aria-label='variats' innerRef={register}>
              <FormControlLabel
                value='variant1'
                control={<Radio />}
                label='Variant 1'
              />
              <FormControlLabel
                value='variant2'
                control={<Radio />}
                label='Variant 2'
              />
            </RadioGroup>
          }
          name='type'
          control={control}
        />

        <div
          hidden={
            watch('type') === 'variant2' ||
            watch('type') === undefined
          }
        >
          <TextField
            name='variant1.email'
            label={`Email`}
            size={'small'}
            margin='normal'
            fullWidth
            inputRef={register}
          />
          <TextField
            label={`Password`}
            size={'small'}
            type='password'
            name='variant1.password'
            margin='normal'
            fullWidth
            inputRef={register}
          />
          <TextField
            name='variant1.confirmPassword'
            type='password'
            label={'Confirm password'}
            size={'small'}
            margin='normal'
            fullWidth
            inputRef={register}
          />
        </div>

        <div
          hidden={
            watch('type') === 'variant1' ||
            watch('type') === undefined
          }
        >
          <TextField
            name='variant2.phone'
            label={`Phone`}
            size={'small'}
            margin='normal'
            fullWidth
            inputRef={register}
          />
          <TextField
            label={`Pin`}
            size={'small'}
            type='password'
            name='variant2.pin'
            margin='normal'
            fullWidth
            inputRef={register}
          />
          <TextField
            name='variant2.confirmPin'
            type='password'
            label={'Confirm pin'}
            size={'small'}
            margin='normal'
            fullWidth
            inputRef={register}
          />
        </div>

        <Button type='submit' variant='outlined'>{t`submit`}</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  width: 350px;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  & > button[type='submit'] {
    align-self: flex-end;
  }
`;
