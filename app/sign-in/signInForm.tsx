'use client'
import { Button, Stack, TextInput, PasswordInput, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"

export function SignInForm() {
  const form = useForm({
    initialValues: {
      phone: '',
      password: '',
    },
  })

  const handleSubmit = async (formData: any) => {
    // await create(formData)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} >
      <Stack gap='1rem'>
        <TextInput
          name='phone'
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          withAsterisk
          {...form.getInputProps('phone')}
        />
        <PasswordInput
          name='password'
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          withAsterisk
          {...form.getInputProps('password')}
        />
      </Stack>
      <Button fullWidth mt='1.5rem' type="submit" >Đăng nhập</Button>
    </form>
  )
}
