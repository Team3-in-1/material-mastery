"use client";
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  checkNameFormat,
  checkEmailFormat,
  checkPhoneFormat,
  checkPasswordFormat,
} from "@/utils/regex";
import { userService } from "@/services/userServices";

export function SignUpForm() {
  const form = useForm({
    // validateInputOnChange: true,
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      termsOfService: false,
    },
    validate: {
      name: (value) => checkNameFormat(value),
      phone: (value) => checkPhoneFormat(value),
      email: (value) => checkEmailFormat(value),
      // password: (value) => checkPasswordFormat(value),
    },
  });

  const handleSubmit = async (formData: any) => {
    //await actionSignUp(formData);
    if (
      formData &&
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.password
    ) {
      await userService.register(formData);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="1rem">
        <TextInput
          name="name"
          label="Tên"
          placeholder="Nhập tên của bạn"
          withAsterisk
          {...form.getInputProps("name")}
          size="md"
        />
        <TextInput
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          withAsterisk
          {...form.getInputProps("phone")}
          size="md"
        />
        <TextInput
          name="email"
          label="Email"
          placeholder="Nhập email"
          withAsterisk
          {...form.getInputProps("email")}
          size="md"
        />
        <PasswordInput
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          withAsterisk
          {...form.getInputProps("password")}
          size="md"
        />
        <Checkbox
          mt="md"
          label="Tôi đồng ý với các chính sách và điều khoản"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />
      </Stack>
      <Button fullWidth h="3rem" mt="1.5rem" type="submit">
        Đăng ký
      </Button>
    </form>
  );
}
