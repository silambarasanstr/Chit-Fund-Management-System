import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
