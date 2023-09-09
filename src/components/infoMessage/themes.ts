import { createTheme } from "@mui/material/styles";

export const infoMessageTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.infoMessageContainer": {
                            padding: "0px",
                            maxWidth: "none",
                        },
                        "&.secondaryContainer": {
                            width: "100%",
                            maxWidth: "none",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 2,
                            paddingRight: {
                                xs: "0",
                                sm: "0",
                                md: "0",
                                lg: "0",
                            },
                            backgroundColor: "#212121",
                            color: "white",
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        "&.infoMessageButton": {
                            width: "100%",
                            backgroundColor: "#191970",
                            "&:hover": {
                                backgroundColor: "#00004e",
                            },
                        },
                    }),
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.closeButton": {
                            fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                            color: "inherit",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: ({ theme }) =>
                    theme.unstable_sx({
                        "&.title": {
                            m: 0,
                            fontSize: {
                                xs: "1.4rem",
                                sm: "1.5rem",
                                md: "1.9rem",
                                lg: "2.2rem",
                            },
                        },
                    }),
                body1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.text": {
                            fontSize: { md: "1.2rem", lg: "1.4rem" },
                        },
                    }),
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.dialogContent": {
                            backgroundColor: "#212121",
                            color: "white",
                        },
                    }),
            },
        },
    },
});
