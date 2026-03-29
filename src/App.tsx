import { Stack, Title } from "@mantine/core";
import AppContent from "./components/app/AppContent";

function App() {
  return (
    <Stack>
      <Title order={1}>Scorekeeper</Title>
      <AppContent />
    </Stack>
  );
}

export default App;
