import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router />
    </MantineProvider>
  );
}

export default App;
