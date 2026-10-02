import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import RecipeExplorer from "./pages/RecipeExplorer";
import Favorites from "./pages/Favorites";

const theme = createTheme({
  palette: {
    background: {
      default: "#F4F1EA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C2623",
    },
  },
});

function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <RecipeExplorer
                favorites={favorites}
                setFavorites={setFavorites}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
