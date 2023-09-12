import { createTheme } from "@mui/material/styles";

export const userReportDisplayTheme = createTheme({
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
                        "&.skeletonContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: {
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
                            backgroundColor: "#22222263",
                            borderRadius: "8px",
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
        MuiSkeleton: {
            styleOverrides: {
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.skeletonText1": {
                            width: { xs: 150, sm: 150, md: 155 },
                            height: { xs: 50, sm: 60, md: 65 },
                        },
                        "&.skeletonText2": {
                            width: { xs: 200, sm: 215, md: 240 },
                            height: { xs: 30, sm: 30, md: 35 },
                        },
                    }),
                rectangular: ({ theme }) =>
                    theme.unstable_sx({
                        "&.skeletonRectangular": {
                            width: { xs: 180, sm: 200, md: 225 },
                            height: { xs: 180, sm: 210, md: 245 },
                        },
                    }),
            },
        },
    },
});
