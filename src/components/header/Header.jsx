import {
  AppBar,
  InputBase,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const Search = styled("div")(() => {
  const muiTheme = useTheme();
  return {
    position: "relative",
    borderRadius: muiTheme.shape.borderRadius,
    backgroundColor: "white",
    marginLeft: 0,
    [muiTheme.breakpoints.up("sm")]: {
      marginLeft: muiTheme.spacing(1),
      width: "auto",
    },
  };
});

const SearchIconWrapper = styled("div")(() => {
  const muiTheme = useTheme();
  return {
    padding: muiTheme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0000008a", // Update color here
  };
});

const StyledInputBase = styled(InputBase)(() => {
  const muiTheme = useTheme(); // Use the useTheme hook
  return {
    color: "0000008a",
    "& .MuiInputBase-input": {
      padding: muiTheme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${muiTheme.spacing(4)})`,
      transition: muiTheme.transitions.create("width"),
      width: "100%",
      [muiTheme.breakpoints.up("sm")]: {
        width: "20ch",
      },
    },
  };
});

export function Header() {
  return (
    <AppBar style={{ height: "72px", position: "static" }}>
      <Toolbar sx={{ display: "flex", height: "inherit" }}>
        <Typography variant="h6" component="div" sx={{  }}>
          NewsFeed App
        </Typography>
        <Select
          style={{
            backgroundColor: "white",
            width: "200px",
            height: "40px",
            outline: "none",
            margin: "16px"
          }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Age"
          defaultValue="general"
        >
          <MenuItem value="general">General</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="health">Health</MenuItem>
          <MenuItem value="science">Science </MenuItem>
          <MenuItem value="sports">Sports </MenuItem>
          <MenuItem value="technology">Technology </MenuItem>
        </Select>
        <Search style={{marginLeft: "auto"}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
