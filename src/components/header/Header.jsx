import React from "react";
import {
  AppBar,
  InputBase,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.action,
  backgroundColor: theme.palette.common.white,
  "&:before": {
    borderColor: theme.palette.action,
  },
  "&:after": {
    borderColor: theme.palette.action,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.action,
  },
  margin: theme.spacing(2),
  width: 200,
  height: 40,
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: "auto",
  width: 200,
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export const Header = React.memo(function Header(props) {
  const handleInputChange = (e) => {
    props.searching.current = e.target.value;
    props.searchBySearch();
  }

  function handleCategoryChange(e) {
    props.searchingByCategory.current = e.target.value;
    props.searchByCategory();
  }

  return (
    <AppBar style={{ height: "72px", position: "static" }}>
      <Toolbar sx={{ display: "flex", height: "inherit" }}>
        <Typography variant="h6" component="div">
          NewsFeed App
        </Typography>
        <StyledSelect
          defaultValue="general"
          onChange={handleCategoryChange}
          MenuProps={{ disableScrollLock: true }}
        >
          <StyledMenuItem value="general">General</StyledMenuItem>
          <StyledMenuItem value="business">Business</StyledMenuItem>
          <StyledMenuItem value="entertainment">Entertainment</StyledMenuItem>
          <StyledMenuItem value="health">Health</StyledMenuItem>
          <StyledMenuItem value="science">Science</StyledMenuItem>
          <StyledMenuItem value="sports">Sports</StyledMenuItem>
          <StyledMenuItem value="technology">Technology</StyledMenuItem>
        </StyledSelect>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="action" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleInputChange}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
});
