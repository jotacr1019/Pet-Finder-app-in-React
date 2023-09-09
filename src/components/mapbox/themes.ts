import { createTheme } from "@mui/material/styles";

export const mapboxTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.mapboxContainer": {
                            width: { xs: "100%" },
                            maxWidth: "none",
                            height: { xs: "65vh", md: "72vh", lg: "75vh" },
                            marginBottom: "15px",
                            borderRadius: "6px",
                            boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                        },
                        "&.searchContainer": {
                            marginTop: "4px",
                            marginLeft: "4px",
                            position: "absolute",
                            width: { xs: "70%" },
                            maxWidth: "400px",
                            borderRadius: "6px",
                            backdropFilter: "brightness(0.3)",
                        },
                        "&.itemsContainer": {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            maxWidth: "none",
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.searchButton": {
                            backgroundColor: "transparent",
                            minWidth: "0px",
                            width: "0px",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        },
                        "&.listItemButton": {
                            margin: "0px",
                            padding: "0px",
                            fontSize: { xs: "0.6rem", sm: "0.7rem" },
                            textAlign: "left",
                            "&:hover": { backgroundColor: "transparent" },
                        },
                    }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.searchInput": {
                            ".MuiInputBase-root": {
                                paddingRight: "10px",
                                gap: "10px",
                                color: "#fff",
                            },
                            width: "100%",
                        },
                    }),
            },
        },
        MuiList: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.list": {
                            width: "100%",
                            maxWidth: 360,
                        },
                    }),
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.listEmptyItem": {
                            padding: 1,
                            minHeight: "70px",
                            backgroundColor: "#b0c4de",
                        },
                        "&.listItem": {
                            padding: "6px 8px",
                            minHeight: "70px",
                            backgroundColor: "#b0c4de",
                        },
                    }),
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.primaryItemText": {
                            textAlign: "left",
                            ".MuiTypography-root": {
                                fontSize: {
                                    xs: "0.7rem",
                                    sm: "0.9rem",
                                    md: "1.1rem",
                                },
                            },
                        },
                        "&.secondaryItemText": {
                            textAlign: "left",
                            ".MuiTypography-root": {
                                fontSize: {
                                    xs: "0.7rem",
                                    md: "0.8rem",
                                    lg: "0.9rem",
                                },
                            },
                        },
                    }),
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.divider": {
                            color: "#fff",
                            backgroundColor: "#fff",
                        },
                    }),
            },
        },
    },
});
