import { ROUTE } from "@/constants/route";
import { useLogin } from "@/services/auth/useLogin";
import { setCookie } from "@/utils/cookie";
import {
  Button,
  Center,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPage() {
  const navigate = useNavigate();

  const login = useLogin({
    onSuccess: ({ accessToken }) => {
      setCookie("accessToken", accessToken, 30);
      navigate(ROUTE.HOME);
    },
    onError: (error) => toast.error(error.response?.data.message),
  });

  const { onSubmit, getInputProps } = useForm<LoginFormValues>({
    initialValues: {
      email: "+84344329446",
      password: "682436",
    },
    validate: {
      email: isNotEmpty("Email không hợp lệ"),
      password: isNotEmpty("Password không được để trống"),
    },
  });

  const handleLogin = (values: LoginFormValues) => {
    login.mutate(values);
  };

  return (
    <Center mih="100vh">
      <Container w="100%" size={420} my={40}>
        <Title ta="center">Welcome back!</Title>

        <Paper
          component="form"
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onSubmit={onSubmit(handleLogin)}
        >
          <TextInput
            label="Email"
            placeholder="you@finder.dev"
            withAsterisk
            {...getInputProps("email")}
          />
          <PasswordInput
            label="Mật khẩu"
            placeholder="finder123"
            withAsterisk
            mt="md"
            {...getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl" loading={login.isLoading}>
            Đăng nhập
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
