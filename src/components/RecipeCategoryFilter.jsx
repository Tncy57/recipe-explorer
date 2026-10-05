import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function RecipeCategoryFilter({ selectCategory, selectedCategory }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
    );
    const result = await response.json();
    const { categories } = result;
    const categoryData = categories
      .map((c) => ({
        id: c.idCategory,
        category: c.strCategory,
      }))
      .sort((a, b) => {
        if (a.category === "Dessert") return 1;
        if (b.category === "Dessert") return -1;

        return a.category.localeCompare(b.category);
      });
    setCategoryList(categoryData);
  }

  const handleChange = (selectedCategory) => {
    selectCategory(selectedCategory);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {categoryList.map((c) => {
        const isSelected = selectedCategory.trim() === c.category.trim();

        return (
          <Button
            key={c.id}
            onClick={() => handleChange(c.category)}
            sx={{
              minHeight: 34,
              minWidth: "auto",
              px: 1.6,
              py: 0.6,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",

              backgroundColor: isSelected ? "#2C2623" : "#EAE4D9",
              color: isSelected ? "#FFFFFF" : "#2C2623",

              "&:hover": {
                backgroundColor: isSelected ? "#211c1a" : "#ded8cd",
              },
            }}
          >
            {c.category}
          </Button>
        );
      })}
    </Box>
  );
}
