import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

export const PageB = () => {
  const form = useForm<z.infer<typeof schema>>({resolver, defaultValues: {type: 'variant1'}})

  const onSubmit = form.handleSubmit(
    (data) => console.log(data),
    (errors) => console.warn(errors),
  )

  return (
    <form onSubmit={onSubmit}>
      <select {...form.register('type')}>
        <option value="variant1">1</option>
        <option value="variant2">2</option>
      </select>
      <br />
      <input
        {...form.register('variant1.email')}
        type="email"
      />
      <input
        {...form.register('variant2.phone')}
        type="tel"
      />
      <br />
      <button>submit</button>
    </form>
  )
}

const variant1 = z.object({
  email: z.string().min(3),
})

const variant2 = z.object({
  phone: z.string().min(5),
})

const variant1Catched = variant1.catchall(z.any())
const variant2Catched = variant2.catchall(z.any())

const schema = z
  .object({
    type: z.enum(['variant1', 'variant2']),
    variant1,
    variant2,
  })
  .refine((d) =>
    d.type === 'variant1'
      ? variant1Catched.parse(d.variant1)
      : variant2Catched.parse(d.variant2),
  )

const resolver = zodResolver(schema)