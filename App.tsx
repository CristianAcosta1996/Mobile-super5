import { Provider as PaperProvider } from "react-native-paper";
import { AppNavigation } from "./src/Navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

//SH-1: 22237533125-c9nmds0u0vk8nq46cq5fmsg4jlcsfsdg.apps.googleusercontent.com
export default function App() {
  return (

    <Provider store={store}>
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
    </Provider>
  );
}
