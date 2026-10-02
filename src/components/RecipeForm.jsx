import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";

export default function RecipeForm({ searchByName }) {
  const [recipeName, setRecipeName] = useState("");
  const handleChange = (e) => setRecipeName(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    searchByName(recipeName);
    setRecipeName("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", width: "100%", maxWidth: "350px" }}
    >
      <TextField
        label="Recipe name"
        value={recipeName}
        sx={{
          m: 1,
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          transform: "translateY(-4px)",

          "& .MuiInputBase-input": {
            fontSize: "1.2rem",
            py: 2,
            px: 2,
          },

          "& .MuiInputLabel-root": {
            fontSize: "1.2rem",
          },

          "& .MuiInputAdornment-root .MuiIconButton-root": {
            px: 1.5,
            py: 1,
          },

          "& .MuiInputAdornment-root svg": {
            fontSize: "30px",
          },
        }}
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                <IconButton aria-label="recipe name" edge="end" type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </form>
  );
}
