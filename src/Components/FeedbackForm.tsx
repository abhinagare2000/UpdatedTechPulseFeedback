import React, { useState, FormEvent, useEffect } from "react";
import emailjs from '@emailjs/browser';
import {
  Container,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Checkbox,
  FormGroup,
  LinearProgress,
  Grid,
  Switch,
  IconButton,
  ListItemText,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Send as SendIcon, CheckCircle as CheckCircleIcon, DarkMode, LightMode } from "@mui/icons-material";
import StyledCard from '../Styles/StyleCard.ts';
import { StyledTextFieldNoChanges } from '../Styles/StyledTextField.ts';
import FormData from '../InterFaces/FormData.ts';
import options from '../InterFaces/AnswerOptions.ts';
import { questionLabels, questionPlaceholders } from '../InterFaces/QuestionLabels.ts';

const FeedbackForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage if available
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
      document.body.classList.toggle('dark-mode', savedMode === 'true');
    }
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const handleSelectChange = (category: string, selectedValues: any) => {
    const selectedString = Array.isArray(selectedValues) ? selectedValues.join(", ") : selectedValues;
    setFormData((prev) => ({ ...prev, [category]: selectedString }));
  };

  const initFormDataState = {
    name: "",
    email: "",
    phone: "",
    phoneNo: "",
    importance: "Medium",
    feedback: "",
    communityFeatures: "",
    communities: "",
    interactionFeatures: "",
    privacyFeatures: "",
    uxFeatures: "",
    contentConsumption: "",
    organizingFeatures: "",
    motivations: "",
    additionalComments: "",
    satisfaction: 50,
    subscribe: false,
  };

  const [formData, setFormData] = useState<FormData>(initFormDataState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [progress, setProgress] = useState(0);

  // Check if email has already been used
  const isEmailUsed = (email: string): boolean => {
    const usedEmails: string[] = JSON.parse(localStorage.getItem("usedEmails") || "[]");
    return usedEmails.includes(email);
  };

  // Save email in localStorage to prevent duplicates
  const saveEmail = (email: string): void => {
    const usedEmails: string[] = JSON.parse(localStorage.getItem("usedEmails") || "[]");
    localStorage.setItem("usedEmails", JSON.stringify([...usedEmails, email]));
  };

  const calculateProgress = (): number => {
    const filledFields = Object.values(formData).filter((value) => value !== "" && value !== "Medium").length;
    const totalFields = Object.keys(formData).length;
    return (filledFields / totalFields) * 100;
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [formData]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEmailUsed(formData.email)) {
      setEmailError("This email has already submitted feedback.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting data:", formData);
      saveEmail(formData.email);
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        phoneNo: formData.phoneNo,
        importance: formData.importance,
        feedback: formData.feedback,
        communityFeatures: formData.communityFeatures,
        communities: formData.communities,
        interactionFeatures: formData.interactionFeatures,
        privacyFeatures: formData.privacyFeatures,
        uxFeatures: formData.uxFeatures,
        contentConsumption: formData.contentConsumption,
        organizingFeatures: formData.organizingFeatures,
        motivations: formData.motivations,
        additionalComments: formData.additionalComments,
        satisfaction: formData.satisfaction,
        subscribe: formData.subscribe,
      };
      await emailjs.send(
        'service_533swr7',
        'template_56bp0mi',
        dataToSend,
        'GqcG-qWTRU8OhepQW'
      );
      setShowSuccess(true);
      setFormData(initFormDataState);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: { xs: 4, md: 8 } }}>
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          padding: '8px',
          borderRadius: '20px',
        }}
      >
        <IconButton
          onClick={toggleDarkMode}
          sx={{
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          color="default"
        />
      </Box>

      <StyledCard
        sx={{
          width: "100%",
          p: { xs: 4, sm: 4 },
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
          color: isDarkMode ? '#ffffff' : 'inherit',
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Share Your Feedback
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: 3,
                p: { xs: 2, md: 4 },
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <StyledTextFieldNoChanges
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                fullWidth
                variant="outlined"
              />

              <StyledTextFieldNoChanges
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setEmailError("");
                }}
                required
                fullWidth
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
              />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4} sm={3}>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone: phone || "" })}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "4px",
                      backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      fontSize: "14px",
                    }}
                    numberInputProps={{
                      style: {
                        width: '100%',
                        height: '50px',
                        borderRadius: '4px',
                        backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                        color: isDarkMode ? '#fff' : '#000',
                        border: '1px solid #ccc',
                        padding: '0 10px',
                        fontSize: '14px',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={8} sm={9}>
                  <StyledTextFieldNoChanges
                    label="Phone No"
                    variant="outlined"
                    value={formData.phoneNo}
                    onChange={(e) => {
                      const phoneNumber = e.target.value;
                      if (/^\d{0,10}$/.test(phoneNumber)) {
                        setFormData({ ...formData, phoneNo: phoneNumber });
                      }
                    }}
                    fullWidth
                    InputProps={{
                      style: {
                        backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                        borderRadius: "4px",
                        height: "50px",
                      },
                      inputProps: {
                        maxLength: 10,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: "bold",
                }}
              >
                How important is the ability to connect with people from around the world to you?
              </Typography>
              <RadioGroup
                row
                value={formData.importance}
                onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="High" control={<Radio />} label="High" />
              </RadioGroup>

              {Object.entries(options).map(([category, choices]) => (
                <div key={category} style={{ marginBottom: "20px" }}>
                  {/* Question Title */}
                  <Typography
                    component="span"
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: "bold",
                    }}
                  >
                    {questionLabels[category as keyof typeof questionLabels]}
                  </Typography>

                  {/* Dropdown for Multiple Selection */}
                  <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                    <Select
                      multiple
                      displayEmpty
                      value={
                        formData[category as keyof typeof formData]
                          ? (formData[category as keyof typeof formData] as string).split(", ").filter(Boolean)
                          : []
                      }
                      onChange={(e) => handleSelectChange(category as keyof typeof formData, e.target.value)}
                      renderValue={(selected) =>
                        (selected as string[]).length > 0 ? selected.join(", ") : questionPlaceholders[category as keyof typeof questionPlaceholders]
                      }
                    >
                      {/* Placeholder MenuItem */}
                      <MenuItem disabled value="">
                        <em>{questionPlaceholders[category as keyof typeof questionPlaceholders]}</em>
                      </MenuItem>
                      {choices.map((choice) => (
                        <MenuItem key={choice} value={choice}>
                          <Checkbox
                            checked={
                              formData[category as keyof typeof formData]
                                ? (formData[category as keyof typeof formData] as string).split(", ").includes(choice)
                                : false
                            }
                          />
                          <ListItemText primary={choice} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ))}

              <StyledTextFieldNoChanges
                label="Your Feedback"
                placeholder="Any additional comments, features or suggestions that you believe would improve your experience"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontSize: { xs: "14px", md: "16px" } }}
              >
                How satisfied are you with current social media platforms?
              </Typography>
              <Slider
                value={formData.satisfaction}
                onChange={(_, value) =>
                  setFormData({ ...formData, satisfaction: value as number })
                }
                min={10}
                max={100}
                step={10}
                marks
                valueLabelDisplay="auto"
              />

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.subscribe}
                      onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                    />
                  }
                  label="Subscribe to our email newsletter for updates"
                />
              </FormGroup>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
                fullWidth
              >
                {isSubmitting ? "Submitting..." : <><SendIcon sx={{ mr: 1 }} />Submit Feedback</>}
              </Button>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                <Typography variant="h6" sx={{ marginBottom: "4px" }}>
                  Survey Progress
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: "10px",
                    width: "calc(100% + 20px)",
                    marginLeft: "-10px",
                    marginRight: "-10px",
                    borderRadius: "10px",
                  }}
                />
              </Box>
              {/* Styled link at the bottom-right */}
              <a
                href="http://alfinit.vercel.app"
                style={{
                  position: 'fixed',
                  bottom: '10px',
                  right: '10px',
                  fontSize: '14px',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  display: 'inline-block',
                }}
              >
                Made in Alfinit
              </a>

              {showSuccess && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    color: theme.palette.success.main,
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Thank you for your feedback!</Typography>
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </StyledCard>
    </Container>
  );
};

export default FeedbackForm;