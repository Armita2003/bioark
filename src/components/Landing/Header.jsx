import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import useResponsive from "../../hooks/useResponsive";
import BadgedAvatar from "./BadgedAvatar";

const Header = ({ toggleMenu }) => {
    const isExtraSmallScreen = useResponsive("down", "sm");
    const isSmallScreen = useResponsive("down", "md");

    return (
        <Box sx={{ borderBottom: "1px solid #ccc" }} width={"100%"}>
            <Stack
                direction="row"
                sx={{
                    flexGrow: 1,
                    py: isExtraSmallScreen ? "2px" : isSmallScreen ? "4px" : "6px",
                    px: isExtraSmallScreen ? 1 : "26px",
                    justifyContent: "space-between",
                }}
            >
                <Stack direction="row" gap={isExtraSmallScreen ? "10px" : isSmallScreen ? "20px" : "26px"}>
                    <Stack justifyContent="center">
                        <BadgedAvatar />
                    </Stack>
                    <Stack textAlign="center" alignContent="center" justifyContent="center">
                        <Typography fontSize={isExtraSmallScreen ? 8 : isSmallScreen ? 12 : 14} fontFamily="IRANYekan">
                            مهدی غفاری
                        </Typography>
                        <Typography fontSize={isExtraSmallScreen ? 8 : isSmallScreen ? 12 : 14} fontFamily="IRANYekan">
                            بیمه تامین اجتماعی
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} gap={isExtraSmallScreen ? 1 : 2}>
                    <Stack direction={"row"}>
                        <Stack textAlign="end" alignContent="center" justifyContent="center">
                            <Typography
                                sx={{ color: "var(--primary-color)" }}
                                fontWeight={isExtraSmallScreen ? 600 : 700}
                                fontSize={isExtraSmallScreen ? 11 : isSmallScreen ? 15 : 18}
                                fontFamily="IRANYekanSans"
                            >
                                تقویم
                            </Typography>
                            <Typography
                                sx={{ color: "var(--sub-color)" }}
                                fontSize={isExtraSmallScreen ? 8 : isSmallScreen ? 12 : 14}
                                fontFamily="IRANYekanSans"
                            >
                                سه شنبه ۷ شهریور ماه
                            </Typography>
                        </Stack>
                    </Stack>
                    {isSmallScreen && (
                        <IconButton size="small" onClick={toggleMenu}>
                            <MenuIcon sx={{ width: "15px" }} />
                        </IconButton>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

export default Header;
