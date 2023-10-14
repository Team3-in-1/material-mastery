'use client'
import { Button, Stack, TextInput, PasswordInput, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import { actionSignUp } from "../action";

const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export function SignUpForm() {
  const form = useForm({
    // validateInputOnChange: true,
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      termsOfService: false,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (re.test(value) ? null : 'Invalid email')
    }
  })

  const handleSubmit = async (formData: any) => {
    await actionSignUp(formData)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} >
      <Stack gap='1rem'>
        <TextInput
          name='name'
          label="Tên"
          placeholder="Nhập tên của bạn"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          name='phone'
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          withAsterisk
          {...form.getInputProps('phone')}
        />
        <TextInput
          name='email'
          label="Email"
          placeholder="Nhập email"
          withAsterisk
          {...form.getInputProps('email')}
        />
        <PasswordInput
          name='password'
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          withAsterisk
          {...form.getInputProps('password')}
        />
        <Checkbox
          mt="md"
          label="Tôi đồng ý với các chính sách và điều khoản"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
      </Stack>
      <Button fullWidth mt='1.5rem' type="submit" >Đăng ký</Button>
    </form>
  )
}
