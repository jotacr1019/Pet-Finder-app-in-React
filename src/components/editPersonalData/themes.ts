import { createTheme } from "@mui/material/styles";

export const editPersonalDataTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalDataContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "88%",
                            maxWidth: "none",
                            textAlign: "center",
                        },
                        "&.secondaryDataContainer": {
                            width: "100%",
                            maxWidth: "none",
                            height: "230px",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        "&.formDataContainer": {
                            "& > :not(style)": {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
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
                        "&.editDataButton": {
                            width: { xs: "80%", md: "60%", lg: "55%" },
                            transition: "0.2s",
                            "&:hover": {
                                transform: "scale(1.1)",
                                backdropFilter: "blur(4px)",
                                opacity: 1,
                            },
                            backgroundColor: "#191970",
                            opacity: 0.8,
                            textAlign: "center",
                        },
                    }),
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.submitDataButton": {
                            width: "100%",
                            textAlign: "center",
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
