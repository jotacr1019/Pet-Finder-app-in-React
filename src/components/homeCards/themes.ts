import { createTheme } from "@mui/material/styles";

export const homeCardTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.card": {
                            maxWidth: {
                                xs: "300px",
                                sm: "320px",
                                md: "350px",
                                lg: "360px",
                            },
                            minWidth: {
                                xs: "300px",
                                sm: "320px",
                                md: "350px",
                                lg: "360px",
                            },
                            height: {
                                xs: "365px",
                                sm: "400px",
                                md: "430px",
                                lg: "440px",
                            },
                            borderRadius: "20px",
                            background: "#f5f5f5",
                            position: "relative",
                            padding: "8px 16px",
                            border: "2px solid #c3c6ce",
                            transition: "0.5s ease-out",
                            overflow: "visible",
                            "&:hover": {
                                borderColor: "#008bf8",
                                boxShadow: "0 4px 18px 0 rgba(0, 0, 0, 0.45)",
                                "& .cardButton": {
                                    transform: "translate(-50%, 50%)",
                                    opacity: 1,
                                },
                            },
                        },
                        "&.cardDetails": {
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            color: "black",
                            height: "100%",
                            gap: "8px",
                            overflow: "hidden",
                        },
                        "&.titleContainer": {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "baseline",
                            gap: "8px",
                            width: "fit-content",
                            padding: "0px 14px",
                            borderRadius: "25px",
                            backgroundColor: "#e19568",
                        },
                        "&.cardImageStaticContainer": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content",
                            maxWidth: "100%",
                            height: {
                                xs: "222px",
                                sm: "250px",
                                md: "270px",
                                lg: "280px",
                            },
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        "&.cardButton": {
                            transform: "translate(-50%, 125%)",
                            width: "60%",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#191970",
                            color: "#fff",
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            padding: "3px",
                            position: "absolute",
                            left: "50%",
                            bottom: 0,
                            opacity: 0,
                            transition: "0.3s ease-out",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: ({ theme }) =>
                    theme.unstable_sx({
                        "&.cardTitle": {
                            fontSize: {
                                xs: "1.6rem",
                                sm: "1.8rem",
                                md: "2rem",
                                lg: "2.1rem",
                            },
                            fontWeight: "bold",
                            marginBottom: "10px",
                            marginTop: "6px",
                            textAlign: "center",
                        },
                    }),
                body1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.cardText": {
                            color: "rgb(134, 134, 134)",
                        },
                    }),
            },
        },
    },
});
