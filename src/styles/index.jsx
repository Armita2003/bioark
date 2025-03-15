import { Box, MenuItem, Stack, styled } from "@mui/material";

export const HeaderNavbar = styled(Stack)(({}) => ({
    width: "100%",
    height: "58px",
    backgroundColor: "var(--primary-color)",
    alignItems: "flex-end",
    paddingTop: "15px",
    paddingBottom: "15px",
    justifyContent: "center",
    paddingRight: "115px",
}));

export const MenuDropdown = styled(MenuItem)(({}) => ({
    gap: 10,
    fontFamily: "IRANYekan",
    justifyContent: "end",
    fontSize: 13,
    fontWeight: 500,
    padding: "10px 30px",
}));
export const SeeAllMenuDropdown = styled(MenuItem)(({}) => ({
    gap: 10,
    fontFamily: "IRANYekan",
    justifyContent: "end",
    fontSize: 14,
    fontWeight: 500,
    margin: "11px 8px",
    borderRadius: "4px",
    color: "#636366",
    ":hover": {
        backgroundColor: "rgba(182, 200, 241, 0.29)",
    },
}));
export const MedicationListBox = styled(Box)(({}) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "#FFFFFF",
    borderRadius: 1,
    py: 1,
    px: 1,
    minHeight: "60px",
    width: "100%",
    mb: 1,
    border: "1px solid #E6ECF6",
    textAlign: "end",
}));
export const MedicationListIconBox = styled(Box)(({}) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "#FFFFFF",
    borderRadius: 1,
    py: 1,
    px: 1,
    minHeight: "60px",
    mb: 1,
    border: "1px solid #E6ECF6",
    textAlign: "end",
}));
