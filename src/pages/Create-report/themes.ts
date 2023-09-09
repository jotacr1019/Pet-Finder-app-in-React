import { createTheme } from "@mui/material/styles";

export const createReportTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.createReportContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: {
                                xs: "15px",
                                sm: "25px",
                                md: "30px",
                                lg: "20px",
                            },
                            width: "100%",
                            maxWidth: "none",
                            minWidth: "375px",
                            height: "fit-content",
                            padding: {
                                xs: "35px 35px 75px",
                                sm: "45px 100px 75px",
                                md: "50px 120px 80px",
                                lg: "70px 195px 100px",
                            },
                            backgroundColor: "#4267ac",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h2: ({ theme }) =>
                    theme.unstable_sx({
                        "&.title": {
                            fontSize: {
                                xs: "2.2rem",
                                sm: "3.1rem",
                                md: "4.5rem",
                                lg: "5.2rem",
                            },
                            textAlign: "center",
                            color: "#bdb76b",
                        },
                    }),
                h5: ({ theme }) =>
                    theme.unstable_sx({
                        "&.subtitle": {
                            fontSize: {
                                xs: "1rem",
                                sm: "1.2rem",
                                md: "1.4rem",
                                lg: "1.6rem",
                            },
                            marginBottom: {
                                xs: "25px",
                                sm: "30px",
                                md: "40px",
                                lg: "70px",
                            },
                            textAlign: "center",
                            color: "#fff",
                        },
                    }),
            },
        },
    },
});
