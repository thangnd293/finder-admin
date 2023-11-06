import {
  Button,
  Center,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";

export default function LoginPage() {
  return (
    <Center mih="100vh">
      <Container w="100%" size={420} my={40}>
        <Title ta="center">Welcome back!</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Center>
  );
}
