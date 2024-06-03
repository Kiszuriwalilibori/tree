import React, { ReactNode } from "react";

import { SnackbarProvider } from "notistack";
import { ThemeProvider, theme } from "../theme";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                {children}
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default AppProvider;
