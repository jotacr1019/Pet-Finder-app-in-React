import { createTheme } from "@mui/material/styles";

export const formSignupTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalContainer": {
                            boxShadow:
                                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                            width: {
                                xs: "80%",
                                sm: "70%",
                                md: "55%",
                                lg: "40%",
                            },
                            maxWidth: "none",
                            height: "fit-content",
                            padding: {
                                xs: "24px 20px",
                                sm: "26px 50px",
                                md: "26px 58px",
                                lg: "28px 54px",
                            },
                            backgroundColor: "#212121",
                            borderRadius: "6px",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h3: ({ theme }) =>
                    theme.unstable_sx({
                        "&.title": {
                            textAlign: "center",
                            color: "white",
                            marginBottom: {
                                xs: "4px",
                                sm: "10px",
                                md: "16px",
                                lg: "15px",
                            },
                            typography: {
                                xs: { fontSize: "1.8rem" },
                                sm: { fontSize: "2.2rem" },
                                md: { fontSize: "2.8rem" },
                            },
                        },
                    }),
                body1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.subtitle": {
                            textAlign: "center",
                            gap: "6px",
                            color: "white",
                            marginTop: {
                                xs: "0px",
                                sm: "14px",
                                lg: "10px",
                            },
                            marginBottom: {
                                md: "12px",
                            },
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1rem",
                            },
                        },
                    }),
                body2: ({ theme }) =>
                    theme.unstable_sx({
                        "&.text": {
                            display: "flex",
                            alignSelf: "center",
                            gap: "6px",
                            color: "white",
                            marginTop: {
                                xs: "14px",
                                sm: "14px",
                                md: "20px",
                                lg: "20px",
                            },
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1rem",
                            },
                        },
                    }),
            },
        },
    },
});
