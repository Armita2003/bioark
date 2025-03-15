import { Badge, IconButton } from "@mui/material";
import React from "react";
import AvatarIcon from "../../assets/AvatarIcon";
import NotificationBellIcon, { BellBadge } from "../../assets/NotificationBellIcon";
import useResponsive from "../../hooks/useResponsive";

const BadgedAvatar = () => {
    const isSmallScreen = useResponsive("down", "sm");
    const isMediumScreen = useResponsive("down", "md");
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
                <Badge
                    overlap="circular"
                    badgeContent={<BellBadge size={isSmallScreen ? "10px" : isMediumScreen ? "12px" : "15px"} />}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <IconButton
                        sx={{
                            color: "white",
                            padding: 0,
                        }}
                    >
                        <NotificationBellIcon size={isSmallScreen ? "14px" : isMediumScreen ? "20px" : "24px"} sx={{ fontSize: "14px" }} />
                    </IconButton>
                </Badge>
            }
        >
            <AvatarIcon size={isSmallScreen ? "30px" : isMediumScreen ? "40px" : "66px"} alt="Profile Picture" />
        </Badge>
    );
};

export default BadgedAvatar;
