import { createTheme } from "@mui/material/styles";

export const userReportsTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.userReportsContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: { xs: "40px", sm: "55px", md: "70px" },
                            height: "fit-content",
                            minHeight: {
                                xs: "92.4vh",
                                sm: "90.4vh",
                                md: "90.4vh",
                            },
                            width: "100%",
                            maxWidth: "none",
                            minWidth: "375px",
                            padding: {
                                xs: "45px 18px",
                                sm: "55px 70px",
                                lg: "60px 75px 80px",
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
                                xs: "2rem",
                                sm: "3rem",
                                md: "4.5rem",
                                lg: "5.2rem",
                            },
                            textAlign: "center",
                            color: "#bdb76b",
                        },
                    }),
            },
        },
    },
});
