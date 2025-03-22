import { ManageSearch, Search } from "@mui/icons-material";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export function Header() {
  return (
    <header
      style={{ backgroundColor: "#1976d2", color: "white", padding: "10px" }}
    >
      <h1>NewsFeed App</h1>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select inputProps={{ "aria-label": "Without label" }}>
          <MenuItem defaultChecked value={"General"}>
            General
          </MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
          <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
          <MenuItem value={"Health"}>Health</MenuItem>
          <MenuItem value={"Science"}>Science</MenuItem>
          <MenuItem value={"Sports"}>Sports</MenuItem>
          <MenuItem value={"Technology"}>Technology</MenuItem>
        </Select>
      </FormControl>
    </header>
  );
}
