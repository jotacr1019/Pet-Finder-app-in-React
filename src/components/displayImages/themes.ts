import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

export const ImageButton = styled("span")(({ theme }) => ({
    position: "relative",
    cursor: "auto",
    width: "49.5%",
    height: 330,
    [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        height: 230,
    },
    [theme.breakpoints.down("md")]: {
        width: "100% !important",
        height: 330,
    },
    "&:hover, &.Mui-focusVisible": {
        zIndex: 1,
        "& .MuiImageBackdrop-root": {
            opacity: 0.15,
        },
        "& .MuiImageMarked-root": {
            opacity: 0,
        },
        "& .MuiTypography-root": {
            border: "1px solid currentColor",
            backdropFilter: "blur(4px)",
        },
    },
}));

export const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: "6px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
});

export const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
}));

export const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: "6px",
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
}));

export const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
}));

export const displayImagesTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.imagesContainer": {
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "5px",
                            width: "95%",
                            minHeight: { xs: "240px", sm: "280px" },
                            maxWidth: "none",
                            height: { xs: "fit-content", sm: "fit-content" },
                            marginTop: { xs: "16px", sm: "16px", md: "40px" },
                            padding: "8px",
                            boxShadow: "rgb(255 255 255 / 30%) 0px 0px 0px 3px",
                            borderRadius: "8px",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                subtitle1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.typographyText": {
                            position: "relative",
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        },
                    }),
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.iconButton": {
                            color: "white",
                            border: "2px solid #fff",
                            "&:hover": {
                                border: "2px solid #91323b",
                                transform: "scale(1.1)",
                                backdropFilter: "blur(4px)",
                            },
                        },
                    }),
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.deleteIcon": {
                            fontSize: "2rem",
                            "&:hover": {
                                backdropFilter: "blur(4px)",
                            },
                        },
                    }),
            },
        },
    },
});
