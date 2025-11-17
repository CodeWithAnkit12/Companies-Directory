import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";

type Props = {
  q: string;
  setQ: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  industry: string;
  setIndustry: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  locations: string[];
  industries: string[];
};

export default function Filters({
  q,
  setQ,
  location,
  setLocation,
  industry,
  setIndustry,
  sort,
  setSort,
  locations,
  industries,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Paper
  elevation={3}
  sx={(theme) => ({
    p: 2,
    borderRadius: 3,
    mb: 3,

    // 🔥 Dynamic background for dark/light
    backgroundColor:
      theme.palette.mode === "light" ? "#ffffff" : "#1a1a1a",

    // 🔥 Dynamic shadow
    boxShadow:
      theme.palette.mode === "light"
        ? "0 6px 20px rgba(0,0,0,0.06)"
        : "0 6px 20px rgba(0,0,0,0.45)",

    border:
      theme.palette.mode === "light"
        ? "1px solid #e8e8e8"
        : "1px solid #333",
  })}
>

        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          
          {/* ✅ FIXED SEARCH FIELD */}
          <TextField
            placeholder="Search companies..."
            variant="outlined"
            fullWidth
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "1rem",
                padding: "4px 10px",
              },
            }}
          />

          {/* Location */}
          <TextField
            select
            label="Location"
            size="small"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={(theme) => ({
  minWidth: 160,
  borderRadius: 2,
  backgroundColor:
    theme.palette.mode === "light" ? "#f8f9fc" : "#2b2b2b",
  color: theme.palette.mode === "light" ? "#000" : "#fff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#ccc" : "#555",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#999" : "#888",
  }
})}

          >
            <MenuItem value="">All</MenuItem>
            {locations.map((l) => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
          </TextField>

          {/* Industry */}
          <TextField
            select
            label="Industry"
            size="small"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            sx={(theme) => ({
  minWidth: 160,
  borderRadius: 2,
  backgroundColor:
    theme.palette.mode === "light" ? "#f8f9fc" : "#2b2b2b",
  color: theme.palette.mode === "light" ? "#000" : "#fff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#ccc" : "#555",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#999" : "#888",
  }
})}

          >
            <MenuItem value="">All</MenuItem>
            {industries.map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </TextField>

          {/* Sort */}
          <TextField
            select
            label="Sort"
            size="small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={(theme) => ({
  minWidth: 160,
  borderRadius: 2,
  backgroundColor:
    theme.palette.mode === "light" ? "#f8f9fc" : "#2b2b2b",
  color: theme.palette.mode === "light" ? "#000" : "#fff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#ccc" : "#555",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#999" : "#888",
  }
})}

          >
            <MenuItem value="name_asc">Name ↑</MenuItem>
            <MenuItem value="name_desc">Name ↓</MenuItem>
          </TextField>

        </Box>
      </Paper>
    </motion.div>
  );
}
