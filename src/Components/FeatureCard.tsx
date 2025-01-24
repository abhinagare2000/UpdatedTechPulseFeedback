import React from "react";
import { Card, CardContent, Typography, Box, useTheme, useMediaQuery } from "@mui/material";

interface FeatureCardProps {
  title: string;
  description: string;
  IconComponent: React.ElementType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  IconComponent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "360px", // Ensures consistent max width
        minWidth: "280px", // Ensures consistent min width
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: 3,
        margin: "auto", // Centers the card
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: isMobile ? "none" : "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          "& .icon-container": {
            transform: "scale(1.1)",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
          "& .icon": {
            color: "#fff",
          },
        },
      }}
    >
      {/* Decorative Circle */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: "100px",
          height: "100px",
          background: `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      {/* Icon Container */}
      <Box
        className="icon-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          background: theme.palette.grey[50],
          transition: "all 0.3s ease-in-out",
          position: "relative",
          zIndex: 1,
        }}
      >
        <IconComponent
          className="icon"
          sx={{
            fontSize: 40,
            color: theme.palette.primary.main,
            transition: "all 0.3s ease-in-out",
          }}
        />
      </Box>
      {/* Card Content */}
      <CardContent
        sx={{
          flexGrow: 1, // Ensures consistent height
          p: 0,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 2,
            textAlign: "center",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            textAlign: "center", // Centers the description text
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
