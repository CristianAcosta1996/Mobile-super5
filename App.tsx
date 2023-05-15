import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigation } from "./src/Navigation/AppNavigation";

export default function App() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
}
