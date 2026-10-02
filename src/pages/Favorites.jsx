import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RecipeCard from "../components/RecipeCard";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Favorites({
  favorites,
  setFavorites,
  selectedCountry,
  setSelectedCountry,
}) {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [countryMeals, setCountryMeals] = useState([]);

  useEffect(() => {
    if (!selectedCountry) return;
    async function fetchWithCountryName() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`,
      );
      const result = await response.json();
      const data =
        result?.meals?.map((d) => ({
          id: d.idMeal,
          name: d.strMeal,
          image: d.strMealThumb,
          category: d.strCategory,
          country: selectedCountry || d.strArea,
        })) ?? [];
      setCountryMeals(data);
    }
    fetchWithCountryName();
  }, [selectedCountry]);

  const handleFavoriteClick = (id) => {
    const meal = favorites.find((meal) => meal.id === id); 

    setFavorites((curr) => curr.filter((meal) => meal.id !== id));
    setSnackbarMessage(`${meal.name} removed from favorites`);
    setSnackbarSeverity("info");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, pt: 4 }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            color: "text-primary",
            fontFamily: "'Playfair Display', serif",
            textAlign: "center",
            fontWeight: 700,
            mb: 4,
          }}
        >
          Favorite Recipes
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#text.primary",
            color: "text.secondary",
            mb: 4,
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          Your saved recipes in one place.
        </Typography>

        <Button
          href="/"
          variant="outlined"
          color="text.primary"
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
        >
          ← Back to Recipes
        </Button>
      </Box>
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 400px))",
          gap: 3,
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {(countryMeals.length === 0 ? favorites : countryMeals).map((meal) => {
          return (
            <RecipeCard
              key={meal.id}
              meal={meal}
              isFavorite={true}
              onFavoriteClick={handleFavoriteClick}
              selectCountry={selectCountry}
            />
          );
        })}
      </Box>
    </Box>
  );
}
