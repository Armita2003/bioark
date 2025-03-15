import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Checkbox, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { MedicationListBox, MedicationListIconBox } from "../styles";

const MedicationList = ({ tasks, onTaskStatusChange }) => {
    const isLargeScreen = useResponsive("up", "lg");
    const [medications, setMedications] = useState([
        {
            id: 1,
            name: "پردنیزولون ۰.۵",
            time: "08:00",
            status: "completed",
            isChecked: true,
        },
        {
            id: 2,
            name: "پنتوپرازول ۲۰",
            time: "10:00",
            status: "missed",
            isChecked: false,
            warning: "حساسیت بیمار",
            extraInfo: "ناشتا",
        },
        {
            id: 3,
            name: "استامینوفن",
            time: "12:00",
            status: "missed",
            isChecked: false,
            warning: "از دست رفته",
        },
        {
            id: 4,
            name: "آزمایش خون",
            time: "14:00",
            status: "completed",
            isChecked: true,
        },
        {
            id: 5,
            name: "تعویض ملحفه تخت",
            time: "16:00",
            status: "pending",
            isChecked: false,
        },
        {
            id: 6,
            name: "سرم ۱۰۰۰ سی سی",
            time: "18:00",
            status: "pending",
            isChecked: false,
        },
        {
            id: 7,
            name: "پردنیزولون ۰.۵",
            time: "20:00",
            status: "pending",
            isChecked: false,
        },
        {
            id: 8,
            name: "پردنیزولون ۰.۵",
            time: "22:00",
            status: "pending",
            isChecked: false,
        },
    ]);

    const handleCheckboxChange = (id) => {
        setMedications(
            medications.map((med) => {
                if (med.id === id) {
                    const newStatus = med.isChecked ? "pending" : "completed";
                    onTaskStatusChange(id, "done");
                    return {
                        ...med,
                        isChecked: !med.isChecked,
                        status: newStatus,
                    };
                }
                return med;
            })
        );
    };

    const handleCrossClick = (id) => {
        setMedications(
            medications.map((med) => {
                if (med.id === id) {
                    onTaskStatusChange(id, "missed");
                    return {
                        ...med,
                        status: "missed",
                        isChecked: false,
                        warning: med.warning,
                    };
                }
                return med;
            })
        );
    };

    const CompletedMissedItem = ({ med }) => (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                bgcolor: med.status === "missed" ? "#FEF3F2" : "#F4F6FB",
                borderRadius: 2,
                p: 2,
                minHeight: "60px",
                width: "100%",
                mb: 1,
            }}
        >
            <Stack spacing={1}>
                <Typography
                    sx={{
                        color: "#475467",
                        fontSize: "16px",
                        fontFamily: "IRANYekanSans",
                    }}
                >
                    {med.time}
                </Typography>
                {med.extraInfo && (
                    <Typography
                        sx={{
                            color: "#475467",
                            fontSize: "14px",
                            fontFamily: "IRANYekanSans",
                        }}
                    >
                        {med.extraInfo}
                    </Typography>
                )}
            </Stack>

            <Stack alignItems="flex-end" spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                        sx={{
                            color: "#101828",
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "IRANYekanSans",
                        }}
                    >
                        {med.name}
                    </Typography>
                    <Box
                        sx={{
                            width: 15,
                            height: 15,
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: med.status === "completed" ? "#3538CD" : "#D92D20",
                        }}
                    >
                        {med.status === "completed" ? (
                            <CheckIcon sx={{ color: "white", fontSize: 10 }} />
                        ) : (
                            <CloseIcon sx={{ color: "white", fontSize: 10 }} />
                        )}
                    </Box>
                </Stack>
                {med.warning && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                            sx={{
                                color: "#D92D20",
                                fontSize: "14px",
                                fontFamily: "IRANYekanSans",
                            }}
                        >
                            {med.warning}
                        </Typography>
                        <WarningIcon sx={{ color: "#D92D20", fontSize: "16px" }} />
                    </Stack>
                )}
            </Stack>
        </Box>
    );

    const PendingItem = ({ med }) => (
        <Stack direction="row" alignItems="center" mb={1}>
            <MedicationListIconBox>
                <Box
                    onClick={() => handleCrossClick(med.id)}
                    sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                    }}
                >
                    <CloseIcon sx={{ color: "#8F3D4E", fontSize: 20 }} />
                </Box>
            </MedicationListIconBox>
            <MedicationListBox>
                <Typography
                    sx={{
                        color: "#475467",
                        fontSize: "14px",
                        fontFamily: "IRANYekanSans",
                        pl: 1,
                    }}
                >
                    {med.time}
                </Typography>

                <Stack direction="row" alignItems="center">
                    <Typography
                        sx={{
                            color: "#101828",
                            fontSize: "14px",
                            fontFamily: "IRANYekanSans",
                        }}
                    >
                        {med.name}
                    </Typography>
                    <Checkbox
                        checked={med.isChecked}
                        onChange={() => handleCheckboxChange(med.id)}
                        sx={{
                            color: "#E4E7EC",
                            "&.Mui-checked": {
                                color: "#3538CD",
                            },
                        }}
                    />
                </Stack>
            </MedicationListBox>
        </Stack>
    );

    const filteredMedications = medications.filter((med) => tasks.some((task) => task.id === med.id));

    const pendingMeds = filteredMedications
        .filter((med) => med.status === "pending")
        .sort((a, b) => {
            const timeA = a.time.includes(":") ? a.time : "00:00";
            const timeB = b.time.includes(":") ? b.time : "00:00";
            return timeA.localeCompare(timeB);
        });

    const completedMeds = filteredMedications.filter((med) => med.status === "completed");
    const missedMeds = filteredMedications.filter((med) => med.status === "missed");

    if (isLargeScreen) {
        return (
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={tasks.length === 8 ? 6 : 12}>
                    {pendingMeds.map((med) => (
                        <PendingItem key={med.id} med={med} />
                    ))}
                </Grid>
                <Grid item xs={tasks.length === 8 ? 6 : 12}>
                    {completedMeds.map((med) => (
                        <CompletedMissedItem key={med.id} med={med} />
                    ))}
                    {missedMeds.map((med) => (
                        <CompletedMissedItem key={med.id} med={med} />
                    ))}
                </Grid>
            </Grid>
        );
    }

    return (
        <Stack spacing={2}>
            {pendingMeds.map((med) => (
                <PendingItem key={med.id} med={med} />
            ))}
            {completedMeds.map((med) => (
                <CompletedMissedItem key={med.id} med={med} />
            ))}
            {missedMeds.map((med) => (
                <CompletedMissedItem key={med.id} med={med} />
            ))}
        </Stack>
    );
};

export default MedicationList;
