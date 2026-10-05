import { useEffect, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RecipeCategoryFilter from "../components/RecipeCategoryFilter";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RecipeCard from "../components/RecipeCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function RecipeExplorer({
  favorites,
  setFavorites,
  selectedCountry,
  setSelectedCountry,
}) {
  const [mealName, setMealName] = useState("chicken");
  const [mealList, setMealList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchRecipe();
  }, [mealName, selectedCategory, selectedCountry]);

  async function fetchRecipe() {
    setLoading(true);
    setError(false);

    try {
      let result;

      if (selectedCountry) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`,
        );
        result = await response.json();
      } else if (selectedCategory) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
        );
        result = await response.json();
      } else {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
        );
        result = await response.json();
      }
      //console.log(result.meals);
      const data =
        result?.meals?.map((d) => ({
          id: d.idMeal,
          name: d.strMeal,
          image: d.strMealThumb,
          category: d.strCategory,
          country: selectedCountry || d.strArea,
          youtube: d.strYoutube,
        })) ?? [];

      const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

      setMealList(sortedData);
    } catch (error) {
      setError(true);
      setMealList([]);
    } finally {
      setLoading(false);
    }
  }
  const searchByName = (name) => {
    setSelectedCountry("");
    setSelectedCategory("");
    setMealName(name);
  };

  const selectCategory = (category) => {
    setSelectedCountry("");
    setSelectedCategory((curr) => (curr === category ? "" : category));
  };

  const selectCountry = (country) => {
    setSelectedCategory("");
    setSelectedCountry(country);
  };

  const handleFavoriteClick = (id) => {
    const isFavorite = favorites.some((fav) => fav.id === id);

    if (isFavorite) {
      const meal = mealList.find((m) => m.id === id);
      setFavorites((curr) => curr.filter((c) => c.id !== id));
      setSnackbarMessage(`${meal.name} removed from favorites`);
      setSnackbarSeverity("info");
      setOpen(true);
    } else {
      const meal = mealList.find((m) => m.id === id);
      setFavorites((curr) => [...curr, meal]);
      setSnackbarMessage(`${meal.name} added to favorites.`);
      setSnackbarSeverity("success");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //if (loading) return <LoadingState />;
  //if (error) return <ErrorState onRetry={fetchRecipe} />;
  //if (mealList.length === 0) return <EmptyState />

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, pt: 4 }}>
      <Typography
        variant="h2"
        sx={{
          color: "text.primary",
          fontFamily: "'Playfair Display', serif",
          textAlign: "center",
          fontWeight: 700,
          mb: 4,
        }}
      >
        Recipe Explorer
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "text.primary",
          mb: 5,
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "1.1rem",
        }}
      >
        Discover recipes, explore new flavors, and save your favorites.
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 2,
          mb: 6,
          flexWrap: "wrap",
        }}
      >
        {/* Search Box */}
        <Box>
          <RecipeForm searchByName={searchByName} />
        </Box>

        {/* Categories Box */}
        <Box
          sx={{
            maxWidth: 600,
          }}
        >
          <RecipeCategoryFilter
            selectCategory={selectCategory}
            selectedCategory={selectedCategory}
          />
        </Box>

        {/* Favorites Box */}
        <Box
          sx={{
            mt: { xs: 2, md: 0 },
          }}
        >
          <Button
            href="/favorites"
            variant="outlined"
            sx={{
              minWidth: 190,
              height: 56,
              px: 2,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "text.primary",

              border: "1px solid",
              borderColor: "rgba(44, 38, 35, 0.45)",

              "& .MuiButton-startIcon svg": {
                fontSize: "28px",
              },

              "&:hover": {
                border: "1px solid",
                borderColor: "rgba(44, 38, 35, 0.65)",
                backgroundColor: "#F4F1EA",
              },

              "&:focus": {
                backgroundColor: "transparent",
              },

              "&:active": {
                backgroundColor: "transparent",
              },
            }}
            startIcon={<FavoriteBorderIcon />}
          >
            Favorite Recipes
          </Button>
          {(selectedCategory || selectedCountry || mealName !== "chicken") && (
            <Button
              onClick={() => {
                setSelectedCategory("");
                setSelectedCountry("");
                setMealName("chicken");
              }}
              sx={{
                display: "flex",
                mx: "auto",
                mt: 1,
                minWidth: 190,
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "text.primary",
                },
              }}
            >
              ← Show All Recipes
            </Button>
          )}
        </Box>

        {/* Snackbar */}
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
      </Box>

      {/* Category Title */}
      {selectedCategory && (
        <Box
          sx={{
            mt: 1,
            mb: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "texy.primary",
            }}
          >
            {selectedCategory} Recipes
          </Typography>
        </Box>
      )}

      {/* Country Title */}
      {selectedCountry && (
        <Box
          sx={{
            mt: 1,
            mb: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Recipes From {selectedCountry}
          </Typography>
        </Box>
      )}

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState onRetry={fetchRecipe} />
      ) : mealList.length === 0 ? (
        <EmptyState />
      ) : (
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
          {mealList.map((meal) => {
            const isFavorite = favorites.some((fav) => fav.id === meal.id);

            return (
              <RecipeCard
                key={meal.id}
                meal={meal}
                isFavorite={isFavorite}
                onFavoriteClick={handleFavoriteClick}
                selectCountry={selectCountry}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
