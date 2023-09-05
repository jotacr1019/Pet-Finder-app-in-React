import { createTheme } from "@mui/material/styles";

export const formCreateReportTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.buttonsContainer": {
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            alignItems: "center",
                            gap: {
                                xs: "20px",
                                sm: "22px",
                                md: "60px",
                                lg: "60px",
                            },
                            marginTop: {
                                xs: "50px",
                                sm: "45px",
                                md: "70px",
                                lg: "90px",
                            },
                            width: { xs: "100%", md: "70%" },
                            maxWidth: "none",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                body1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.mapboxText": {
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem",
                                md: "1.2rem",
                                lg: "1.4rem",
                            },
                            marginBottom: {
                                xs: "14px",
                                sm: "16px",
                                md: "20px",
                                lg: "22px",
                            },
                            marginTop: {
                                xs: "-20px",
                                sm: "-30px",
                                md: "-26px",
                                lg: "-32px",
                            },
                            textAlign: "center",
                            color: "#fff",
                        },
                    }),
                body2: ({ theme }) =>
                    theme.unstable_sx({
                        "&.dropzoneText": {
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.8rem",
                                md: "0.9rem",
                                lg: "1rem",
                            },
                            marginBottom: {
                                xs: "26px",
                                md: "36px",
                                lg: "40px",
                            },
                            marginTop: {
                                xs: "-44px",
                                sm: "-36px",
                                md: "-26px",
                                lg: "-32px",
                            },
                            textAlign: "center",
                            color: "#fff",
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        "&.submitButton": {
                            width: "100%",
                            backgroundColor: "#191970",
                            fontSize: { lg: "1.2rem" },
                            "&:hover": {
                                backgroundColor: "#00004e",
                            },
                        },
                        "&.cancelButton": {
                            width: "100%",
                            backgroundColor: "#91323b",
                            "&:hover": {
                                backgroundColor: "#891722",
                            },
                            fontSize: { lg: "1.2rem" },
                        },
                    }),
            },
        },
    },
});
