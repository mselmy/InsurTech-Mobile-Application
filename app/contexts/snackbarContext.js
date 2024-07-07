import { createContext, useState } from "react";
import { PaperProvider, Portal, Snackbar } from "react-native-paper";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    visible: true,
    message: "Hello, I'm a snackbar!",
    duration: 7000,
    type: "default",
    action: {
      label: "OK",
      onPress: () => {
        // cancel the snackbar
        setSnackbar({ ...snackbar, visible: false });
        console.log("snackbar action pressed");
      },
    },
  });

  function changeThemeOnType(type) {
    switch (type) {
      case "success":
        return { colors: { surface: "#4caf50" } };
      case "error":
        return { colors: { surface: "#f44336" } };
      case "warning":
        return { colors: { surface: "#ff9800" } };
      default:
        return { colors: { surface: "#2196f3" } };
    }
  }

  function changeStyleOnType(type) {
    switch (type) {
      case "success":
        return { backgroundColor: "#4caf50", color: "#fff" };
      case "error":
        return { backgroundColor: "#f44336", color: "#fff" };
      case "warning":
        return { backgroundColor: "#ff9800", color: "#fff" };
      default:
        return { backgroundColor: "#2196f3", color: "#fff" };
    }
  }

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      <PaperProvider>
        {children}
        <Portal>
          <Snackbar
            visible={snackbar.visible}
            onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
            duration={snackbar.duration}
            action={snackbar.action}
            // theme={changeThemeOnType(snackbar.type)}
            // dark={true}
            maxFontSizeMultiplier={1.5}
            // rippleColor="#fff"
            // theme={}
            style={changeStyleOnType(snackbar.type)}
            // theme={{ colors: { primary: "green" } }}
          >
            {snackbar.message}
          </Snackbar>
        </Portal>
      </PaperProvider>
    </SnackbarContext.Provider>
  );
};
