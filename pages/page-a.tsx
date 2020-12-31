import {defineMessage, t} from '@lingui/macro'
import {H1} from 'atoms'
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import zz from '@hookform/resolvers/zod' // TODO: ESM modules to be supported
import {Button, TextField} from '@material-ui/core'
import styled from '@emotion/styled'

export const PageA = () => {
  const form = useForm({resolver: zz.zodResolver(schema)})

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
    form.reset()
  })

  return (
    <>
      <H1>{t`page a content`}</H1>
      <Form onSubmit={onSubmit}>
        <TextField
          inputRef={form.register}
          name="login"
          error={!!form.errors.login}
          helperText={form.errors.login?.message}
          label={t`login`}
        />
        <TextField
          inputRef={form.register}
          name="password"
          type="password"
          error={!!form.errors.password}
          helperText={form.errors.password?.message}
          label={t`password`}
        />
        <TextField
          inputRef={form.register}
          name="confirm"
          type="password"
          error={!!form.errors.confirm}
          helperText={form.errors.confirm?.message}
          label={t`confirm password`}
        />
        <Button type="submit" variant="outlined">{t`submit`}</Button>
      </Form>
    </>
  )
}

const schema = z
  .object({
    login: z.string().min(3, defineMessage({id: 'login is too short'}).id),
    password: z
      .string()
      .min(6, defineMessage({id: 'password is too short'}).id),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: defineMessage({id: "passwords don't match"}).id,
    path: ['confirm'],
  })

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
`
