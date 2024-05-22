import React, { ReactNode } from "react";

import { SnackbarProvider } from "notistack";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
        >
            {children}
        </SnackbarProvider>
    );
};

export default AppProvider;
