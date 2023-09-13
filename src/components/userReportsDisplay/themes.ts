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
                        "&.notFoundContainer": {
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            alignItems: "center",
                            gap: { xs: "4px", md: "24px", lg: "34px" },
                            maxWidth: {
                                xs: "400px",
                                sm: "445px",
                                md: "620px",
                                lg: "690px",
                            },
                            marginTop: { xs: "140px", sm: "36px", md: "36px" },
                            padding: {
                                xs: "10px 10px",
                                sm: "12px 20px",
                            },
                            boxShadow:
                                "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        },
                        "&.notFoundTextButtonContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: { xs: "50px", sm: "55px", md: "30px" },
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
        MuiTypography: {
            styleOverrides: {
                h4: ({ theme }) =>
                    theme.unstable_sx({
                        "&.notFoundText": {
                            color: "#fff",
                            textAlign: "center",
                            fontSize: {
                                xs: "1.1rem",
                                md: "1.6rem",
                                lg: "1.7rem",
                            },
                        },
                    }),
            },
        },
    },
});
