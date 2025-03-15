import { ArrowDropDown } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Menu, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChartButtonIcon from "../../assets/ChartButtonIcon";
import EditIcon from "../../assets/EditIcon";
import MonitorIcon from "../../assets/MonitorIcon";
import SettingIcon from "../../assets/SettingIcon";
import {
    EighthDotIcon,
    FifthDotIcon,
    FirstDotIcon,
    ForthDotIcon,
    SecondDotIcon,
    SeventhDotIcon,
    SixthDotIcon,
    ThirdDotIconFirst,
    ThirdDotIconSecond,
} from "../../assets/TimelineIcons/DotIcons";
import useResponsive from "../../hooks/useResponsive";
import { SeeAllMenuDropdown } from "../../styles";
import MedicationList from "../MedicationList";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Landing = () => {
    const isLargeScreen = useResponsive("up", "lg");
    const isMediumScreen = useResponsive("down", "lg");
    const isSmallScreen = useResponsive("down", "md");
    const [selectedMenuItem, setSelectedMenuItem] = useState("نمایش همه");
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [timeRange, setTimeRange] = useState([7, 22]);
    const [tasks, setTasks] = useState({
        done: [],
        missed: [],
        remaining: [],
    });

    useEffect(() => {
        setTasks({
            done: [
                { id: 1, time: "08:00" },
                { id: 4, time: "14:00" },
            ],
            missed: [
                { id: 2, time: "10:00" },
                { id: 3, time: "12:00" },
            ],
            remaining: [
                { id: 5, time: "16:00" },
                { id: 6, time: "18:00" },
                { id: 7, time: "20:00" },
                { id: 8, time: "22:00" },
            ],
        });
    }, []);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
        handleClose();
    };

    const handleTaskStatusChange = (taskId, status) => {
        setTasks((prev) => {
            const newTasks = { ...prev };
            const findTask = (category) => {
                return category.find((task) => task.id === taskId);
            };

            newTasks.done = newTasks.done.filter((task) => task.id !== taskId);
            newTasks.missed = newTasks.missed.filter((task) => task.id !== taskId);
            newTasks.remaining = newTasks.remaining.filter((task) => task.id !== taskId);

            const task = findTask(prev.done) || findTask(prev.missed) || findTask(prev.remaining);

            if (status === "done") {
                newTasks.done.push(task);
            } else if (status === "missed") {
                newTasks.missed.push(task);
            } else {
                newTasks.remaining.push(task);
            }
            return newTasks;
        });
    };

    const getFilteredTasks = () => {
        let filteredTasks = [];
        switch (selectedMenuItem) {
            case "نمایش همه":
                filteredTasks = [...tasks.done, ...tasks.missed, ...tasks.remaining];
                break;
            case "نمایش باقیمانده ها":
                filteredTasks = tasks.remaining;
                break;
            case "نمایش از دست رفته ها":
                filteredTasks = tasks.missed;
                break;
            case "نمایش انجام شده ها":
                filteredTasks = tasks.done;
                break;
            default:
                filteredTasks = [...tasks.done, ...tasks.missed, ...tasks.remaining];
        }

        const timeFilteredTasks = filteredTasks.filter((task) => {
            if (!task.time) return false;

            const [hours, minutes] = task.time.split(":").map(Number);
            const taskHour = hours;

            if (timeRange[1] < timeRange[0]) {
                return taskHour >= timeRange[0] || taskHour <= timeRange[1];
            }

            return taskHour >= timeRange[0] && taskHour <= timeRange[1];
        });

        return timeFilteredTasks;
    };

    const PatientsConditions = [
        { title: ":بیماری", condition: "آرتریت روماتوئید", hasBox: false },
        { title: ":شرح حال امروز", condition: "سرگیجه همراه با کمی درد در قسمت دست و پا و گردن", hasBox: false },
        { title: ":حساسیت دارویی", condition: "پنی سلین", hasBox: true },
        { title: ":حساسیت غذایی", condition: "حساسیت به غذاهای کنسروی", hasBox: false },
        { title: ":تعادل جسمی", condition: "ندارد", hasBox: false },
        { title: ":وضعیت راه رفتن", condition: "ویلچر", hasBox: false },
        { title: ":وضعیت غذا خوردن", condition: "عدم توانایی", hasBox: false },
        { title: ":رژیم غذایی", condition: "_", hasBox: false },
    ];

    return (
        <Grid container pt={1} sx={{ maxWidth: "100%", overflow: "hidden" }}>
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Grid item display={isSmallScreen ? "none" : "block"} minWidth={isMediumScreen ? "240px" : isLargeScreen ? "281px" : "230px"}>
                    <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                </Grid>
                <Grid item flexGrow={1} sx={{ borderRight: "1px solid #ccc" }} pb={80}>
                    <Header toggleMenu={toggleMenu} />
                    <Box>
                        <Box justifySelf="center" mt={isSmallScreen ? "24px" : "84px"} mb="34px" width={isMediumScreen ? "100%" : "95%"}>
                            <CustomProgressBar progress={70} />
                        </Box>
                        <Grid container px={isSmallScreen ? "16px" : isMediumScreen ? "20px" : "26px"} width={"100%"}>
                            <Grid item xs={12} sm={isMediumScreen ? 12 : 5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={isMediumScreen ? 6 : 12}>
                                        <Box
                                            borderRadius={"7px"}
                                            width={"100%"}
                                            height={"446px"}
                                            sx={{ backgroundColor: "#FBFCFD", py: isSmallScreen ? "1px" : "31px", px: "21px" }}
                                        >
                                            <Stack gap={3}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Tooltip
                                                        title="ویرایش"
                                                        arrow
                                                        placement="top"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    fontSize: "12px",
                                                                    backgroundColor: "#424242",
                                                                    color: "#FFFFFF",
                                                                    fontFamily: "IRANYekanSans",
                                                                    py: "14px",
                                                                    pl: isSmallScreen ? "12px" : "16px",
                                                                    pr: isSmallScreen ? "10px" : "20px",
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <Button sx={{ minWidth: "30px" }}>
                                                            <EditIcon />
                                                        </Button>
                                                    </Tooltip>
                                                    <Typography
                                                        sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
                                                        fontSize={18}
                                                        fontFamily="IRANYekanSans"
                                                    >
                                                        :وضعیت کلی بیمار
                                                    </Typography>
                                                </Stack>
                                                <Stack width={"100%"} gap={"18px"}>
                                                    {PatientsConditions.map((items, index) => {
                                                        return (
                                                            <Stack direction={"row"} key={index}>
                                                                <Stack width={"100%"}>
                                                                    <Typography
                                                                        sx={{
                                                                            alignSelf: "end",
                                                                        }}
                                                                        textAlign={"end"}
                                                                        fontSize={13}
                                                                        fontFamily="IRANYekanSans"
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                backgroundColor: items.hasBox ? "#E7999A" : "transparent",
                                                                                color: items.hasBox ? "white" : "#424242",
                                                                                borderRadius: items.hasBox ? "4px" : 0,
                                                                                px: 1,
                                                                            }}
                                                                        >
                                                                            {items.condition}
                                                                        </Box>
                                                                    </Typography>
                                                                </Stack>
                                                                <Stack width={"100%"}>
                                                                    <Typography
                                                                        sx={{ color: "var(--primary-color)" }}
                                                                        textAlign={"end"}
                                                                        fontSize={14}
                                                                        fontFamily="IRANYekanSans"
                                                                    >
                                                                        {items.title}
                                                                    </Typography>
                                                                </Stack>
                                                            </Stack>
                                                        );
                                                    })}
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={isMediumScreen ? 6 : 12} mt={isMediumScreen ? 4 : 0}>
                                        <Box pl={isSmallScreen ? "12px" : "27px"} pr={isSmallScreen ? "10px" : "17px"} width={"100%"}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={"18px"}>
                                                <Stack direction="row">
                                                    <Tooltip
                                                        title="ویرایش"
                                                        arrow
                                                        placement="top"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    fontSize: "12px",
                                                                    backgroundColor: "#424242",
                                                                    color: "#FFFFFF",
                                                                    fontFamily: "IRANYekanSans",
                                                                    py: "14px",
                                                                    pl: "16px",
                                                                    pr: "20px",
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <Button sx={{ minWidth: "30px" }}>
                                                            <EditIcon />
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="مشاهده نمودار علايم حیاتی بیمار"
                                                        arrow
                                                        placement="top"
                                                        componentsProps={{
                                                            tooltip: {
                                                                sx: {
                                                                    fontSize: "12px",
                                                                    backgroundColor: "#424242",
                                                                    color: "#FFFFFF",
                                                                    fontFamily: "IRANYekanSans",
                                                                    py: "14px",
                                                                    pl: "16px",
                                                                    pr: "20px",
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <Button sx={{ minWidth: "30px" }}>
                                                            <ChartButtonIcon />
                                                        </Button>
                                                    </Tooltip>
                                                </Stack>
                                                <Typography
                                                    sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
                                                    fontSize={18}
                                                    fontFamily="IRANYekanSans"
                                                >
                                                    مانیتور بیمار
                                                </Typography>
                                            </Stack>
                                            <Stack alignItems={"center"} width={"100%"} sx={{ objectFit: "contain" }}>
                                                <MonitorIcon />
                                            </Stack>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={isMediumScreen ? 12 : 7}>
                                <Box
                                    sx={{
                                        backgroundColor: "rgba(244, 246, 251, 0.38)",
                                        borderRadius: "7px",
                                        width: "100%",
                                        height: "446px",
                                        py: "31px",
                                        px: isSmallScreen ? "10px" : "21px",
                                        mx: "auto",
                                        maxWidth: isMediumScreen ? "800px" : "100%",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{
                                            justifySelf: "end",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "var(--primary-color)",
                                                fontWeight: "bold",
                                            }}
                                            fontSize={18}
                                            fontFamily="IRANYekanSans"
                                        >
                                            :وظایف امروز
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"} alignItems={"center"}>
                                        <Tooltip
                                            title="تنظیمات"
                                            arrow
                                            placement="top"
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        fontSize: "12px",
                                                        backgroundColor: "#424242",
                                                        color: "#FFFFFF",
                                                        fontFamily: "IRANYekanSans",
                                                        py: "14px",
                                                        pl: isSmallScreen ? "10px" : "16px",
                                                        pr: isSmallScreen ? "10px" : "20px",
                                                    },
                                                },
                                            }}
                                        >
                                            <Button>
                                                <SettingIcon />
                                            </Button>
                                        </Tooltip>
                                        <Button sx={{ height: "42px" }} onClick={handleClick}>
                                            <Stack
                                                alignItems={"center"}
                                                direction={"row"}
                                                fontFamily="IRANYekanSans"
                                                fontSize={12}
                                                sx={{
                                                    color: "#636366",
                                                    width: "188px",
                                                    border: "1px solid #7798D5",
                                                    borderRadius: "4px",
                                                    pr: "11px",
                                                }}
                                                justifyContent={"space-between"}
                                            >
                                                <IconButton sx={{ color: "#505D6C" }}>
                                                    <ArrowDropDown />
                                                </IconButton>
                                                {selectedMenuItem}
                                            </Stack>
                                        </Button>
                                    </Stack>
                                    <Stack mt={"22px"} alignItems={"end"} mb={"29px"}>
                                        <RangeSlider value={timeRange} onChange={setTimeRange} />
                                    </Stack>
                                    <MedicationList tasks={getFilteredTasks()} onTaskStatusChange={handleTaskStatusChange} />
                                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ padding: 2, ml: 1, mt: 1.25 }}>
                                        <SeeAllMenuDropdown onClick={() => handleMenuItemClick("نمایش همه")}>نمایش همه</SeeAllMenuDropdown>

                                        <SeeAllMenuDropdown onClick={() => handleMenuItemClick("نمایش باقیمانده ها")}>
                                            نمایش باقیمانده ها
                                        </SeeAllMenuDropdown>
                                        <SeeAllMenuDropdown onClick={() => handleMenuItemClick("نمایش از دست رفته ها")}>
                                            نمایش از دست رفته ها
                                        </SeeAllMenuDropdown>
                                        <SeeAllMenuDropdown onClick={() => handleMenuItemClick("نمایش انجام شده ها")}>
                                            نمایش انجام شده ها
                                        </SeeAllMenuDropdown>
                                    </Menu>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Landing;
const CustomProgressBar = ({ progress }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    const totalLength = 3270;

    const strokeDashoffset = Math.max(0, totalLength - (clampedProgress / 100) * totalLength);

    const dotPositions = {
        firstBigDot: 1,
        dot1: 4.2,
        dot2: 13.5,
        dot3: 23,
        dot4: 40.5,
        dot5: 48.5,
        dot6: 64.2,
        dot7: 78.5,
        dot8: 97.2,
        bigDot: 100,
    };

    const isDotActive = (dotPosition) => {
        return clampedProgress >= dotPosition;
    };
    const dotData = [
        { cx: 907.5, cy: 10, icon: <FirstDotIcon />, number: "۸:۰۰", position: dotPositions.dot1 },
        { cx: 604.5, cy: 11, icon: <SecondDotIcon />, number: "۱۰:۰۰", position: dotPositions.dot2 },
        { cx: 295.5, cy: 11, icon: [<ThirdDotIconFirst />, <ThirdDotIconSecond />], number: "۱۲:۰۰", position: dotPositions.dot3 },
        { cx: 1004.5, cy: 92, icon: <ForthDotIcon />, number: "۲۱:۳۰ ", position: dotPositions.dot6 },
        { cx: 719.5, cy: 173, icon: <FifthDotIcon />, number: "۲:۰۰ ", position: dotPositions.dot7 },
        { cx: 228.5, cy: 92, icon: <SixthDotIcon />, number: "۱۶:۱۵", position: dotPositions.dot4 },
        { cx: 491.5, cy: 92, icon: <SeventhDotIcon />, number: "۲۰:۳۰", position: dotPositions.dot5 },
        { cx: 111.5, cy: 173, icon: <EighthDotIcon />, number: "۶:۰۰", position: dotPositions.dot8 },
    ];

    return (
        <Box sx={{ width: "100%", margin: "0 auto", height: "100%", overflow: "visible" }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1069 183"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ padding: 20, overflow: "visible" }}
            >
                <path d="M1047 11H29C15.1929 11 4 22.1929 4 36V67C4 80.8071 15.1929 92 29 92H1047" stroke="#CECFDE" strokeWidth="5" />
                <path
                    d="M25 173L1040 173C1053.81 173 1065 161.807 1065 148L1065 117C1065 103.193 1053.81 91.9999 1040 91.9999L25 92"
                    stroke="#CECFDE"
                    strokeWidth="5"
                />

                <path
                    d="M1047 11H29C15.1929 11 4 22.1929 4 36V67C4 80.8071 15.1929 92 29 92H1047C1050.81 92 1065 103.193 1065 117V148C1065 161.807 1050.81 173 1047 173H25V92"
                    stroke="#613AEA"
                    strokeWidth="5"
                    strokeDasharray={totalLength}
                    strokeDashoffset={strokeDashoffset}
                />

                {dotData.map((dot, index) => (
                    <g key={index}>
                        <ellipse cx={dot.cx} cy={dot.cy} rx="5.5" ry="5" fill={isDotActive(dot.position) ? "#613AEA" : "#CECFDE"} />

                        <foreignObject x={dot.cx - 530} y={dot.cy - 125} width="100%" height="100%">
                            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {dot.icon}
                            </div>
                        </foreignObject>
                        <text x={dot.cx} y={dot.cy - 20} textAnchor="middle" fontSize={20} fill={isDotActive(dot.position) ? "#613AEA" : "#CECFDE"}>
                            {dot.icon}
                        </text>

                        <text
                            x={dot.cx}
                            y={dot.cy + 20}
                            textAnchor="middle"
                            fontSize="12"
                            fontFamily="IRANYekanSans"
                            fill={isDotActive(dot.position) ? "#B2C6E3" : "#636366"}
                        >
                            {dot.number}
                        </text>
                    </g>
                ))}
                <ellipse cx="1048" cy="10.23" rx="11" ry="10.23" fill={isDotActive(dotPositions.firstBigDot) ? "#613AEA" : "#CECFDE"} />
                <text
                    x="1048"
                    y="10.23 - 20"
                    textAnchor="middle"
                    fontSize="12"
                    fill={isDotActive(dotPositions.firstBigDot) ? "#613AEA" : "#CECFDE"}
                ></text>
                <text fontFamily="IRANYekanSans" x="1036" y="34" fontSize="12" fill={isDotActive(dotPositions.bigDot) ? "#613AEA" : "#CECFDE"}>
                    ۷:۰۰
                </text>

                <ellipse cx="21" cy="172.77" rx="11" ry="10.23" fill={isDotActive(dotPositions.bigDot) ? "#613AEA" : "#CECFDE"} />
            </svg>
        </Box>
    );
};

import Slider from "@mui/material/Slider";

const RangeSlider = ({ value, onChange }) => {
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    const formatTime = (hour) => {
        const formattedHour = hour % 24;
        return `${formattedHour.toString().padStart(2, "0")}:۰۰`;
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Typography fontSize={14} color="var(--primary-color)" fontFamily="IRANYekanSans" mb={1} textAlign={"end"}>
                بازه زمانی: {formatTime(value[0])} ـ {formatTime(value[1])}
            </Typography>
            <Slider
                value={value}
                min={0}
                max={24}
                step={1}
                marks={[
                    { value: 0, label: "۰۰:۰۰" },
                    { value: 6, label: "۰۶:۰۰" },
                    { value: 12, label: "۱۲:۰۰" },
                    { value: 18, label: "۱۸:۰۰" },
                    { value: 24, label: "۲۴:۰۰" },
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatTime(value)}
                sx={{
                    color: "#36459B",
                    "& .MuiSlider-thumb": {
                        backgroundColor: "white",
                        border: "1px solid #36459B",
                    },
                }}
                onChange={handleChange}
            />
        </Box>
    );
};
