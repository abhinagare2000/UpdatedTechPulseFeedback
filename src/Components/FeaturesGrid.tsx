import React from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  styled,
} from "@mui/material";
import {
  People,
  Chat,
  Build,
  Lock,
  Explore,
  Videocam,
  Code,
  Help,
  MonetizationOn,
  Bolt,
  Event,
  IntegrationInstructions,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import FeatureCard from './FeatureCard.tsx'

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  {
    title: "Community-Centric Design",
    description:
      "Organized discussions with predefined tech categories, subgroups for quality content.",
    icon: People,
  },
  {
    title: "Real-Time Communication",
    description:
      "Text, voice, video channels, threaded chats, and broadcast updates.",
    icon: Chat,
  },
  {
    title: "Customizability",
    description:
      "Tech-specific templates, advanced moderation tools, and bot integrations for automation.",
    icon: Build,
  },
  {
    title: "Privacy and Networking",
    description:
      "Anonymous profiles, selective sharing, and secure, encrypted messaging.",
    icon: Lock,
  },
  {
    title: "Discoverability",
    description:
      "Tech trends, skill-based recommendations, and event listings for webinars and hackathons.",
    icon: Explore,
  },
  {
    title: "Multimedia and Collaboration",
    description:
      "Share videos, code, and documents; live collaboration tools; and resource repositories.",
    icon: Videocam,
  },
  {
    title: "Tech Collaboration Tools",
    description:
      "Integrated coding editor, version control, and coding challenges.",
    icon: Code,
  },
  {
    title: "Knowledge Sharing",
    description:
      "Expert tagging, mentor-mentee programs, and skill-based networking.",
    icon: Help,
  },
  {
    title: "Monetization",
    description:
      "Freelancing marketplace, premium communities, and revenue-sharing for creators.",
    icon: MonetizationOn,
  },
  {
    title: "AI Assistance",
    description:
      "Smart recommendations, automated moderation, and virtual assistants.",
    icon: Bolt,
  },
  {
    title: "Events",
    description:
      "Host virtual hackathons, tech conferences, and speed networking sessions.",
    icon: Event,
  },
  {
    title: "Tool Integration",
    description: "Cloud storage, GitHub support, and APIs Integrations for custom apps.",
    icon: IntegrationInstructions,
  },
];

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
  },
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
  zIndex: 1,
}));


interface FeaturesGridProps {
  onClose: () => void;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  const Spacer: React.FC<{ height?: string; width?: string }> = ({
    height = "16px",
    width = "0",
  }) => {
    return <div style={{ height, width }} />;
  };

  if (isMobile) {
    // Mobile-specific layout
    return (
      <Container
        maxWidth="xs"
        sx={{
          py: 2,
          px: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We are developing an Innovative platform that will blend the best of
            communication, community engagement and collaboration For Technology
            Community into one seamless experience.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your insights are invaluable in helping us build a platform that
            fits your needs and enhances your digital connections.
          </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
        <ScrollContainer
          ref={containerRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: "6px",
            },
             "&::-webkit-scrollbar-thumb": {
              background: theme.palette.primary.main,
              borderRadius: "4px",
            },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 1,
                width: "100%", // Smaller width for mobile
                height: "100%",
                mx: 2,
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                IconComponent={feature.icon}
              />
            </Box>
          ))}
        </ScrollContainer>
        <Spacer />
              <IconButton
                sx={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  position: "absolute",
                  left: "50%", // Centering horizontally
                  transform: "translateX(-20%)", // Center the button
                  zIndex: 2,
                  borderRadius: "4px", // Optional, to give the button rounded corners
                  "&:hover": {
                    background: `linear-gradient(1deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Slight scaling effect on hover
                  },
                }}
                onClick={onClose} // Replace with your feedback handler
              >
                Share Feedback
              </IconButton>
          </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2, md: 4 },
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 1,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          We are developing an Innovative platform that will bring the
          Communication and Collaboration For Technology Community into one
          seamless experience.
        </Typography>

        <Typography
          variant={isMobile ? "body1" : "h5"}
          align="center"
          sx={{
            mb: { xs: 3, sm: 4 },
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Your insights are invaluable in helping us build a platform that fits
          your needs!
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        {!isMobile && (
          <>
            <ScrollButton
              onClick={() => scroll("left")}
              sx={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                position: "absolute",
                left: -20,
                zIndex: 2,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Slight zoom on hover
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <KeyboardArrowLeft />
            </ScrollButton>

            <ScrollButton
              onClick={() => scroll("right")}
              sx={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                position: "absolute",
                right: -20,
                zIndex: 2,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Slight zoom on hover
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <KeyboardArrowRight />
            </ScrollButton>
          </>
        )}

        <ScrollContainer ref={containerRef}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                minWidth: { xs: "280px", sm: "320px", md: "360px" },
                height: "100%",
                mx:2,
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                IconComponent={feature.icon}
              />
            </Box>
          ))}
        </ScrollContainer>
        
        <Spacer />
        <IconButton
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
            position: "absolute",
            left: "50%", // Centering horizontally
            transform: "translateX(-20%)", // Center the button
            zIndex: 2,
            borderRadius: "4px", // Optional, to give the button rounded corners
            "&:hover": {
              background: `linear-gradient(1deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Slight scaling effect on hover
            },
          }}
          onClick={onClose} // Replace with your feedback handler
        >
          Share Feedback
        </IconButton>
      </Box>
    </Container>
  );
};

export default FeaturesGrid;