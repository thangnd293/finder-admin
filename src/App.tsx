import "@/utils/prototype";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./Router";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title as TitleChart,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  TitleChart,
  Tooltip,
  Legend
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables>
        <ModalsProvider>
          <Router />
          <ToastContainer />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
