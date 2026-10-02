import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        No recipes found
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Try searching for a different recipe.
      </Typography>

      <Button
        color="secondary"
        variant="outlined"
        href="/"
        sx={{
          mt: 2,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Back to Recipes
      </Button>
    </Box>
  );
}
