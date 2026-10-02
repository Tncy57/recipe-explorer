import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ErrorState({ onRetry }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Something went wrong
      </Typography>

      <Typography variant="body2" color="text.secondary">
        We couldn't load the recipes. Please try again.
      </Typography>

      <Button
        color="secondary"
        variant="outlined"
        onClick={onRetry}
        sx={{
          mt: 2,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Try Again
      </Button>
    </Box>
  );
}
