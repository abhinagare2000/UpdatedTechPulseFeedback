import {
  Card,
  styled,
} from "@mui/material";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
}));

export default StyledCard;