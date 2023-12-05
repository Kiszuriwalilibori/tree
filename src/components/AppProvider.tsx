import { SnackbarProvider } from "notistack";

export const AppProvider: React.FC = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            {children}
        </SnackbarProvider>
    );
};
export default AppProvider;
