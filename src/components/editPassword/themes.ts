import { createTheme } from "@mui/material/styles";

export const editPasswordTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "88%",
                            maxWidth: "none",
                            textAlign: "center",
                        },
                        "&.secondaryContainer": {
                            width: "100%",
                            maxWidth: "none",
                            height: "230px",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        "&.formContainer": {
                            "& > :not(style)": {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "10px",
                                height: 220,
                                width: { xs: 250, sm: 335, md: 400, lg: 440 },
                                maxWidth: "none",
                            },
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                outlined: ({ theme }) =>
                    theme.unstable_sx({
                        "&.editPasswordButton": {
                            width: { xs: "80%", md: "60%", lg: "55%" },
                            transition: "0.2s",
                            "&:hover": {
                                transform: "scale(1.1)",
                                backdropFilter: "blur(4px)",
                                opacity: 1,
                            },
                            backgroundColor: "#191970",
                            opacity: 0.8,
                        },
                    }),
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.submitButton": {
                            width: "100%",
                            backgroundColor: "#191970",
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
                        },
                    }),
            },
        },
    },
});
