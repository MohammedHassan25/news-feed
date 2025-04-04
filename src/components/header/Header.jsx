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

export function Header(props) {
  function handleInputChange(e) {
    props.searching.current = e.target.value;
    props.searchBySearch();
  }
  return (
    <AppBar style={{ height: "72px", position: "static" }}>
      <Toolbar sx={{ display: "flex", height: "inherit" }}>
        <Typography variant="h6" component="div">
          NewsFeed App
        </Typography>
        <Select
          style={{
            backgroundColor: "white",
            width: "200px",
            height: "40px",
            outline: "none",
            margin: "16px",
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
}
