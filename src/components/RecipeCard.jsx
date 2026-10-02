import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { countryCodes } from "../data/countryCodes";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeCard({
  meal,
  isFavorite,
  onFavoriteClick,
  selectCountry,
}) {
  const [ingredients, setIngredients] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [detailIsLoaded, setDetailIsLoaded] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);

    if (detailIsLoaded) return;

    async function fetchRecipe() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      const result = await response.json();
      const meal = result.meals[0];

      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
          ingredients.push(ingredient);
        }
      }

      setIngredients(ingredients);
      setInstructions(meal.strInstructions);
      setDetailIsLoaded(true);
    }
    fetchRecipe();
  };

  const steps = instructions
    ? instructions.split(/\r?\n/).filter((step) => step.trim() !== "")
    : [];

  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        minHeight: 190,
        boxShadow: 3,
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <IconButton
        aria-label="favorite"
        onClick={() => onFavoriteClick(meal.id)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          color: isFavorite ? "error.main" : "#FFFFFF",
          backgroundColor: "rgba(44, 38, 35, 0.35)",

          "&:hover": {
            backgroundColor: "rgba(44, 38, 35, 0.55)",
            transform: "scale(1.08)",
          },
        }}
      >
        <FavoriteIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto", pt: 3 }}>
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {meal.name}
              </Typography>

              {meal.country ? (
                <ButtonBase
                  onClick={() => selectCountry(meal.country)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                    borderRadius: 1,
                    px: 0.5,
                    py: 0.25,
                    color: "text.secondary",
                    justifyContent: "flex-start",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {countryCodes[meal.country] ? (
                    <img
                      src={`https://flagcdn.com/w40/${countryCodes[meal.country]}.png`}
                      alt={`${meal.country} flag`}
                      style={{
                        width: "25px",
                        height: "auto",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "2px",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "20px" }}>🌎</span>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    {meal.country}
                  </Typography>
                </ButtonBase>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <span style={{ fontSize: "20px" }}>🌎</span>

                  <Typography variant="body2" color="text.secondary">
                    Unknown
                  </Typography>
                </Box>
              )}
            </CardContent>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                pb: 2.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {meal.category}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  ml: "auto",
                }}
              >
                {meal.youtube && (
                  <Tooltip title="Watch recipe video">
                    <IconButton
                      component="a"
                      href={meal.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Watch recipe video"
                      sx={{
                        color: "#FF0000",
                        "&:hover": {
                          color: "#CC0000",
                          backgroundColor: "rgba(255, 0, 0, 0.08)",
                        },
                      }}
                    >
                      <YouTubeIcon />
                    </IconButton>
                  </Tooltip>
                )}

                <Typography
                  component="span"
                  sx={{
                    color: "text.disabled",
                    mx: 0.5,
                    fontSize: "0.9rem",
                  }}
                >
                  /
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    cursor: "pointer",
                    color: "text.secondary",
                  }}
                  onClick={() => handleExpandClick(meal.id)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Recipe
                  </Typography>

                  <ExpandMore
                    expand={expanded === meal.id}
                    aria-expanded={expanded === meal.id}
                    aria-label="show more"
                    sx={{
                      p: 0,
                      minWidth: "auto",
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        fontSize: 29,
                        strokeWidth: 1.5,
                      }}
                    />
                  </ExpandMore>
                </Box>
              </Box>
            </Box>
          </Box>

          <CardMedia
            component="img"
            sx={{
              width: 175,
              objectFit: "cover",
              cursor: "pointer",
            }}
            image={meal.image}
            alt="meal-image"
            onClick={() => setImageOpen(true)}
          />
          <Dialog
            open={imageOpen}
            onClose={() => setImageOpen(false)}
            maxWidth="md"
          >
            <Box
              component="img"
              src={meal.image}
              alt={meal.name}
              sx={{
                display: "block",
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </Dialog>
        </Box>

        <Collapse in={expanded === meal.id} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 600,
              }}
            >
              Ingredients:
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: 3,
                mb: 3,
                color: "text.secondary",
                lineHeight: 1.8,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                columnGap: 4,
              }}
            >
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 600,
              }}
            >
              Method
            </Typography>

            <Box component="ol" sx={{ pl: 3, mb: 2 }}>
              {steps.map((step, index) => (
                <li key={index}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      mb: 1,
                    }}
                  >
                    {step}
                  </Typography>
                </li>
              ))}
            </Box>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}
