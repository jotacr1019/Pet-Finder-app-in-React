import { createTheme } from "@mui/material/styles";

export const homeDisplayTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.homeCardContainer": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            backgroundColor: "#4267ac",
                        },
                        "&.secondaryContainer": {
                            width: "100%",
                            maxWidth: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "4px",
                            padding: 2,
                            paddingTop: {
                                xs: "6px",
                                sm: "6px",
                            },
                            paddingRight: {
                                xs: "0",
                                sm: "0",
                                md: "0",
                                lg: "0",
                            },
                            backgroundColor: "#212121",
                            color: "white",
                        },
                        "&.notFoundContainer": {
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            maxWidth: { sm: "445px", md: "620px", lg: "690px" },
                            marginTop: { xs: "150px", sm: "80px", md: "36px" },
                        },
                    }),
            },
        },
        MuiList: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.listCard": {
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(300px,1fr))",
                            gap: { xs: "80px", sm: "90px" },
                            width: "100%",
                        },
                    }),
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.listItem": {
                            justifyContent: "center",
                            width: "100%",
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.closeButton": {
                            minWidth: "0px",
                            fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                            alignSelf: "flex-end",
                            paddingRight: "6px",
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
                        "&.reportTitle": {
                            m: 0,
                            textAlign: "center",
                            fontSize: {
                                xs: "1.6rem",
                                sm: "1.7rem",
                                md: "1.9rem",
                                lg: "2.6rem",
                            },
                            padding: {
                                xs: "0px 56px 0px 40px",
                            },
                        },
                        "&.notFoundText": {
                            color: "#fff",
                            textAlign: "center",
                            fontSize: {
                                md: "2.8rem",
                            },
                        },
                    }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.MuiPaper-root": {
                            maxWidth: {
                                xs: "360px",
                                sm: "370px",
                                md: "400px",
                                lg: "470px",
                            },
                            minWidth: "330px",
                            borderRadius: "8px",
                        },
                    }),
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.dialogContent": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: { xs: "22px" },
                            padding: {
                                xs: "16px",
                                md: "26px 20px ",
                            },
                            backgroundColor: "#212121",
                        },
                    }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.messageTextField": {
                            input: { color: "#fff" },
                            label: { color: "#fff" },
                            width: "100%",
                            color: "#fff",
                            ".MuiInputBase-inputMultiline": {
                                color: "#fff",
                            },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "white !important",
                            },
                        },
                    }),
            },
        },
    },
});
