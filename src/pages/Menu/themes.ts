import { createTheme } from "@mui/material/styles";

export const menuTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: {
                                xs: "92.4vh",
                                sm: "90.4vh",
                                md: "90.4vh",
                            },
                            width: "100%",
                            minWidth: "375px",
                            maxWidth: "none",
                            padding: {
                                xs: "25px 35px",
                                sm: "30px 100px",
                                md: "30px 120px",
                                lg: "30px 195px",
                            },
                            backgroundImage: {
                                xs: "url(../../src/assets/Petf7.jpg)",
                            },
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
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
                            color: "#d1466c",
                        },
                    }),
            },
        },
    },
});
