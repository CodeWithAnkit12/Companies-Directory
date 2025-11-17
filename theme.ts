import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#F4F7FB" : "#0e1117",
        paper: mode === "light" ? "#ffffff" : "#1a1f24",
      },

      primary: {
        main: "#1976d2",
      },

      secondary: {
        main: "#6c63ff",
      },

      text: {
        primary: mode === "light" ? "#1a1a1a" : "#e5e9f0",
        secondary: mode === "light" ? "#5f6c7b" : "#9aa5b1",
      },
    },

    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", sans-serif`,
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.5px",
      },
      body2: {
        fontSize: "0.9rem",
      },
    },

    shape: {
      borderRadius: 16,
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            padding: "20px",
            transition: "0.25s ease",
            boxShadow:
              mode === "light"
                ? "0 6px 18px rgba(0,0,0,0.06)"
                : "0 6px 18px rgba(0,0,0,0.35)",
            borderRadius: "18px",
            background: mode === "light" ? "#fff" : "#1a1f24",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                mode === "light"
                  ? "0 8px 24px rgba(0,0,0,0.12)"
                  : "0 8px 24px rgba(0,0,0,0.55)",
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 20px",
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            background: mode === "light" ? "white" : "#1f242a",
            borderRadius: 10,
          },
        },
      },
    },
  });
