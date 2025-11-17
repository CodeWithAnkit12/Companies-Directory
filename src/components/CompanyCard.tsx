import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

type Company = {
  id: number;
  name: string;
  location: string;
  industry: string;
  employees: number;
  website: string;
};

export default function CompanyCard({ c }: { c: Company }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.03 }}
      style={{ height: "100%" }}
    >
      <Card
  sx={(theme) => ({
    p: 3,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 4,

    // 🔥 Dynamic background
    backgroundColor:
      theme.palette.mode === "light" ? "#ffffff" : "#1f1f1f",

    // 🔥 Dynamic border
    border:
      theme.palette.mode === "light"
        ? "1px solid #e4e9f2"
        : "1px solid #333",

    // 🔥 Dynamic shadow
    boxShadow:
      theme.palette.mode === "light"
        ? "0 4px 12px rgba(0,0,0,0.04)"
        : "0 4px 12px rgba(0,0,0,0.35)",

    "&:hover": {
      borderColor:
        theme.palette.mode === "light" ? "#b9c4ff" : "#666",
      boxShadow:
        theme.palette.mode === "light"
          ? "0 6px 18px rgba(0,0,0,0.08)"
          : "0 6px 20px rgba(0,0,0,0.6)",
    },
  })}
>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              letterSpacing: "-0.5px",
              mb: 2,
            }}
          >
            {c.name}
          </Typography>

          {/* Info Items */}
          <Box display="flex" flexDirection="column" gap={1.2}>
            <Box display="flex" alignItems="center" gap={1}>
              <span>📍</span>
              <Typography variant="body1" color="text.secondary">
                {c.location}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <span>🏭</span>
              <Typography variant="body1" color="text.secondary">
                {c.industry}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <span>👥</span>
              <Typography variant="body1" color="text.secondary">
                {c.employees} Employees
              </Typography>
            </Box>
          </Box>
        </CardContent>

        {/* Button */}
        <CardActions sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            href={c.website}
            target="_blank"
            sx={{
              py: 1,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              },
              transition: "0.25s",
            }}
          >
            Visit Website
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
