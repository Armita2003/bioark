import { Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CalenderIcon from "../../assets/CalenderIcon";
import ChartIcon from "../../assets/ChartIcon";
import DashboardIcon from "../../assets/DashboardIcon";
import DischargeIcon from "../../assets/DischargeIcon";
import DocumentsIcon from "../../assets/DocumentsIcon";
import EventsIcon from "../../assets/EventsIcon";
import FileIcon from "../../assets/FileIcon";
import HistoryIcon from "../../assets/HistoryIcon";
import InfoIcon from "../../assets/InfoIcon";
import RoutineIcon from "../../assets/RoutineIcon";
import VisitIcon from "../../assets/VisitIcon";
import useResponsive from "../../hooks/useResponsive";
export default function SidebarMenu() {
    const [activeItem, setActiveItem] = useState("روتین پرستاری");
    const isMediumScreen = useResponsive("down", "lg");

    const handleItemClick = (title) => {
        setActiveItem(title);
    };
    const getIconColor = (title, activeItem) => {
        return activeItem === title ? "#36459B" : "#424242";
    };

    const mainMenuItems = [
        { title: "داشبورد", icon: <DashboardIcon size={isMediumScreen ? 20 : 24} color={getIconColor("داشبورد", activeItem)} /> },
        { title: "تقویم", icon: <CalenderIcon size={isMediumScreen ? 20 : 24} color={getIconColor("تقویم", activeItem)} /> },
        { title: "روتین پرستاری", icon: <RoutineIcon size={isMediumScreen ? 20 : 24} color={getIconColor("روتین پرستاری", activeItem)} /> },
        { title: "رخدادها", icon: <EventsIcon size={isMediumScreen ? 20 : 24} color={getIconColor("رخدادها", activeItem)} /> },
        { title: "اسناد بیمار", icon: <DocumentsIcon size={isMediumScreen ? 20 : 24} color={getIconColor("اسناد بیمار", activeItem)} /> },
        { title: "پرونده الکترونیک", icon: <FileIcon size={isMediumScreen ? 20 : 24} color={getIconColor("پرونده الکترونیک", activeItem)} /> },
        { title: "سوابق بیمار", icon: <HistoryIcon size={isMediumScreen ? 20 : 24} color={getIconColor("سوابق بیمار", activeItem)} /> },
        { title: "نمودارها", icon: <ChartIcon size={isMediumScreen ? 20 : 24} color={getIconColor("نمودارها", activeItem)} /> },
        { title: "اطلاعات بیمار", icon: <InfoIcon size={isMediumScreen ? 20 : 24} color={getIconColor("اطلاعات بیمار", activeItem)} /> },
        { title: "ترخیص", icon: <DischargeIcon size={isMediumScreen ? 20 : 24} color={getIconColor("ترخیص", activeItem)} /> },
    ];

    const calendarGuideItems = [
        { title: "ویزیت", icon: <VisitIcon color={"#E5E8F6"} /> },
        { title: "آزمایش", icon: <VisitIcon color={"#FDF2EF"} /> },
        { title: "خدمت", icon: <VisitIcon color={"#E7F6FF"} /> },
    ];

    return (
        <Stack sx={{ textAlign: "right" }} px={"16px"}>
            <List>
                <Typography
                    fontSize={14}
                    fontFamily="IRANYekanSans"
                    fontWeight="medium"
                    sx={{ color: "var(--subMenu-color)" }}
                    px={"10px"}
                    pt={isMediumScreen ? "15px" : "31px"}
                    pb={"16px"}
                >
                    منو اصلی
                </Typography>
                {mainMenuItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => handleItemClick(item.title)}
                        sx={{
                            cursor: "pointer",
                            textAlign: "right",
                            p: 0,
                            height: 47,
                            width: "100%",
                            ":hover": { backgroundColor: "#F4F9FF" },
                            borderRadius: "4px",
                            paddingRight: "17px",
                            paddingLeft: "17px",
                            backgroundColor: activeItem === item.title ? "#F4F9FF" : "transparent",
                        }}
                    >
                        <ListItemText sx={{ fontFamily: "IRANYekanSans" }}>
                            <Stack direction="row" justifyContent="end" gap={"10px"} alignContent="center" alignItems="center">
                                <Typography fontSize={isMediumScreen ? 14 : 14} fontFamily="IRANYekanSans">
                                    {item.title}
                                </Typography>
                                {item.icon}
                            </Stack>
                        </ListItemText>
                    </ListItem>
                ))}
                <Divider sx={{ my: isMediumScreen ? "15px" : "25px" }} />
                <Typography
                    fontFamily="IRANYekanSans"
                    fontWeight="medium"
                    sx={{ color: "var(--subMenu-color)" }}
                    px={"10px"}
                    pb={isMediumScreen ? "10px" : "24px"}
                    fontSize={14}
                >
                    راهنمای تقویم
                </Typography>
                {calendarGuideItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => handleItemClick(item.title)}
                        sx={{
                            cursor: "pointer",
                            textAlign: "right",
                            p: 0,
                            height: 47,
                            width: "100%",
                            ":hover": { backgroundColor: "#F4F9FF" },
                            borderRadius: "4px",
                            paddingRight: "17px",
                            paddingLeft: "17px",

                            backgroundColor: activeItem === item.title ? "#F4F9FF" : "transparent",
                        }}
                    >
                        <ListItemText sx={{ fontFamily: "IRANYekanSans" }}>
                            <Stack direction="row" justifyContent="end" gap={"10px"} alignContent="center" alignItems="center">
                                <Typography fontSize={14} fontFamily="IRANYekanSans">
                                    {item.title}
                                </Typography>
                                {item.icon}
                            </Stack>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
