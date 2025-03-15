import { ArrowDropDown } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { Avatar, Box, Divider, Drawer, IconButton, Menu, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { MenuDropdown } from "../../styles";
import SidebarMenu from "./SidebarMenu";

const Sidebar = ({ isMenuOpen, toggleMenu }) => {
    const isSmallScreen = useResponsive("down", "md");
    const isExtraSmallScreen = useResponsive("down", "sm");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const closeSidebar = () => {
        toggleMenu();
    };

    return (
        <>
            <Box
                sx={{
                    display: isSmallScreen ? "none" : "block",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: "1px solid #ccc", height: "79px" }}>
                    <Stack onClick={handleClick} direction="row" sx={{ py: "6px", px: "26px", justifyContent: "space-between", flexGrow: 1 }}>
                        <IconButton onClick={handleClick} sx={{ color: "var(--primary-color)" }}>
                            <ArrowDropDown />
                        </IconButton>
                        <Stack textAlign="end" alignContent="center" justifyContent="center">
                            <Typography sx={{ color: "var(--primary-color)", fontWeight: "bold" }} fontSize={14} fontFamily="IRANYekanSans">
                                مهدی غفاری
                            </Typography>
                        </Stack>
                    </Stack>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuDropdown onClick={handleClose}>
                            حساب کاربری <Avatar sx={{ width: 25, height: 25 }} />
                        </MenuDropdown>
                        <Divider />
                        <MenuDropdown onClick={handleClose}>
                            افزودن حساب کاربری
                            <PersonAdd sx={{ color: "gray", width: 22 }} />
                        </MenuDropdown>
                        <MenuDropdown onClick={handleClose}>
                            تنظیمات
                            <Settings sx={{ color: "gray", width: 22 }} />
                        </MenuDropdown>
                        <MenuDropdown onClick={handleClose}>
                            خروج از حساب کاربری
                            <Logout sx={{ color: "gray", width: 22 }} />
                        </MenuDropdown>
                    </Menu>
                </Box>
                <Stack sx={{ textAlign: "right" }}>
                    <SidebarMenu />
                </Stack>
            </Box>

            {isSmallScreen && (
                <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
                    <Box sx={{ width: isExtraSmallScreen ? "100vw" : 240, p: 2 }}>
                        <Stack direction="row" sx={{ py: "6px", px: "6px", justifyContent: "space-between", flexGrow: 1 }}>
                            <IconButton onClick={handleClick} sx={{ color: "var(--primary-color)" }}>
                                <ArrowDropDown />
                            </IconButton>
                            <Stack direction="row" textAlign="end" alignItems="center">
                                <Typography
                                    onClick={handleClick}
                                    sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
                                    fontSize={14}
                                    fontFamily="IRANYekanSans"
                                >
                                    مهدی غفاری
                                </Typography>
                                <IconButton onClick={closeSidebar}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                        </Stack>

                        <Divider />

                        <SidebarMenu />
                    </Box>
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
