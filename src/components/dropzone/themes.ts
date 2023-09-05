import { createTheme } from "@mui/material/styles";

export const dropzoneTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.dropzoneContainer": {
                            width: { xs: "95%", sm: "75%", lg: "50%" },
                            maxWidth: "none",
                            marginBottom: { xs: "32px", sm: "15px" },
                            textAlign: "center",
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        "&.dropzoneButton": {
                            width: "100%",
                            fontSize: { md: "1rem", lg: "1.1rem" },
                        },
                    }),
            },
        },
    },
});
