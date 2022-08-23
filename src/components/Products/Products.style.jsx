import { Avatar, Box, styled, Switch, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import AutoDeleteTwoToneIcon from "@mui/icons-material/AutoDeleteTwoTone";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 6,
}));

export const TableGrid = styled(DataGrid)(({ theme }) => ({
  overflow:"scroll",
  overflow:"scroll",
  " &.MuiDataGrid-root .MuiDataGrid-cell": {
   color:"pink"
  },
  " &.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#b7dfff",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  "& .MuiCheckbox-colorPrimary.Mui-checked": {
    color: theme.palette.custom.success,
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "& .MuiTablePagination-displayedRows": {
    color: "white",
  },
  "& .MuiTablePagination-actions": {
    color: "white",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
}));

export const ImageAvatar = styled(Avatar)(({ theme }) => ({}));

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const UpdateIcon = styled(AppRegistrationTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "xx-large",
  color: "#65c466",
  "&:hover": {
    color: "black",
  },
}));
export const DeletionIcon = styled(AutoDeleteTwoToneIcon)(({ theme }) => ({
  cursor: "pointer",
  fontSize: "xx-large",
  color: "red",
  "&:hover": {
    color: "black",
  },
}));

export const ColoumHead = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  fontSize: "16px",
}));

export const RowName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 400,
  color: "black",

  "&:hover": {
    color: "black",
  },
}));