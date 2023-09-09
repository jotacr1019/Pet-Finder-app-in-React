import { createTheme } from "@mui/material/styles";

export const formAuthTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.formAuthContainer": {
                            boxShadow:
                                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                            width: {
                                xs: "80%",
                                sm: "60%",
                                md: "50%",
                                lg: "40%",
                            },
                            maxWidth: "none",
                            height: "68%",
                            padding: {
                                xs: "22px 35px",
                                sm: "32px 48px",
                                md: "28px 48px",
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
                                xs: "18px",
                                sm: "15px",
                                md: "20px",
                                lg: "25px",
                            },
                            typography: {
                                xs: { fontSize: "1.8rem" },
                                sm: { fontSize: "2.2rem" },
                                md: { fontSize: "2.8rem" },
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
