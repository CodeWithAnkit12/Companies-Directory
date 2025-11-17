import { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Filter from "./components/Filter";
import CompanyTable from "./components/CompanyTable";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useAuth } from "./context/AuthContext";

export default function App({ mode, setMode }: any) {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [openLogin, setOpenLogin] = useState(false);
const [openSignup, setOpenSignup] = useState(false);
 const { user, login, signup, logout } = useAuth();
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");
const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

async function handleLogin() {
  try {
    await login(loginEmail, loginPassword);
    setOpenLogin(false);
    // optionally reset fields:
    setLoginEmail("");
    setLoginPassword("");
  } catch (err: any) {
    const msg = err?.message || "Failed to login";
    alert(msg);
  }
}

async function handleSignup() {
  if (signupPassword !== signupConfirmPassword) {
    alert("Passwords do not match");
    return;
  }
  try {
    await signup(signupEmail, signupPassword);
    setOpenSignup(false);
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
  } catch (err: any) {
    const msg = err?.message || "Failed to create account";
    alert(msg);
  }
}

  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [sort, setSort] = useState("name_asc");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const debouncedQ = q.toLowerCase();

  const locations = useMemo(() => {
  return Array.from(new Set(data.map((c) => c.location.split(",")[0]))); 
}, [data]);

const industries = useMemo(() => {
  return Array.from(new Set(data.map((c) => c.industry)));
}, [data]);


 const filtered = useMemo(() => {
  let out = [...data];

  const ql = (debouncedQ || "").trim().toLowerCase();

  // SEARCH
  if (ql) {
    out = out.filter((c) => {
      const name = (c.name || "").toLowerCase();
      const industry = (c.industry || "").toLowerCase();
      return name.includes(ql) || industry.includes(ql);
    });
  }

  // LOCATION FILTER
  if (location) {
    const loc = location.toLowerCase();
    out = out.filter((c) =>
      (c.location || "").toLowerCase().includes(loc)
    );
  }

  // INDUSTRY FILTER
  if (industry) {
    const ind = industry.toLowerCase();
    out = out.filter((c) =>
      (c.industry || "").toLowerCase().includes(ind)
    );
  }

  if (sort === "name_asc") {
    out.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } else {
    out.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
  }

  return out;
}, [data, debouncedQ, location, industry, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  useEffect(() => {
  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/src/data/companies.json");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Failed to load companies data");
    } finally {
      setLoading(false);
    }
  }

  load();
}, []);


  return (
<Box
  sx={(theme) => ({
    backgroundColor: theme.palette.mode === "light" ? "#f0f4f8" : "#121212",
    minHeight: "100vh",
    py: 4,
  })}
>

    <Container sx={{ py: 4 }} maxWidth="lg">
      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: "2rem",
              background: "linear-gradient(90deg, #1976d2, #6c63ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textAlign: "center",
            }}
          >
            Companies Directory
          </Typography>
        </Box>
<Box
  display="flex"
  justifyContent="flex-end"
  alignItems="center"
  sx={{ mb: 3 }}
>
  {user ? (
    <>
      <Typography sx={{ mr: 2 }}>
        Logged in as: <strong>{user.email}</strong>
      </Typography>
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setOpenLogin(true)}>
        Sign In
      </Button>
      <Button variant="contained" onClick={() => setOpenSignup(true)}>
        Sign Up
      </Button>
    </>
  )}
</Box>



      <Filter
        q={q}
        setQ={setQ}
        location={location}
        setLocation={setLocation}
        industry={industry}
        setIndustry={setIndustry}
        sort={sort}
        setSort={setSort}
        locations={locations}
        industries={industries}
      />

      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
<Typography variant="body2">
  Showing <strong>{paged.length}</strong> of <strong>{filtered.length}</strong> result(s)
</Typography>


              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Per page</Typography>
                <TextFieldSelectPageSize
                  value={pageSize}
                  onChange={(v) => {
                    setPageSize(v);
                    setPage(1);
                  }}
                />
              </Stack>
            </Box>

            <CompanyTable data={paged} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Typography variant="body2">
                Page {page} of {totalPages}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                >
                  First
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                >
                  Last
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Container>
    <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
  <IconButton
    onClick={() => setMode(mode === "light" ? "dark" : "light")}
    sx={{
      position: "fixed",
      bottom: 26,
      right: 26,
      zIndex: 1500,
      width: 55,
      height: 55,
      borderRadius: "50%",
      backgroundColor: "primary.main",
      color: "white",
      boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
      transition: "0.25s ease",
      "&:hover": {
        backgroundColor: "primary.dark",
        transform: "scale(1.07)",
      },
    }}
  >
    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
  </IconButton>
</Tooltip>
<Dialog open={openLogin} onClose={() => setOpenLogin(false)} maxWidth="xs" fullWidth>
  <DialogTitle>Sign In</DialogTitle>
  <DialogContent>
    <TextField
      label="Email"
      fullWidth
      margin="dense"
      value={loginEmail}
      onChange={(e) => setLoginEmail(e.target.value)}
    />
    <TextField
      label="Password"
      type="password"
      fullWidth
      margin="dense"
      value={loginPassword}
      onChange={(e) => setLoginPassword(e.target.value)}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenLogin(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleLogin}>Login</Button>
  </DialogActions>
</Dialog>
<Dialog open={openSignup} onClose={() => setOpenSignup(false)} maxWidth="xs" fullWidth>
  <DialogTitle>Create Account</DialogTitle>
  <DialogContent>
    <TextField
      label="Email"
      fullWidth
      margin="dense"
      value={signupEmail}
      onChange={(e) => setSignupEmail(e.target.value)}
    />

    <TextField
      label="Password"
      type="password"
      fullWidth
      margin="dense"
      value={signupPassword}
      onChange={(e) => setSignupPassword(e.target.value)}
    />

    <TextField
      label="Confirm Password"
      type="password"
      fullWidth
      margin="dense"
      value={signupConfirmPassword}
      onChange={(e) => setSignupConfirmPassword(e.target.value)}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenSignup(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}

function TextFieldSelectPageSize({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <TextField
      select
      size="small"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <MenuItem value={4}>4</MenuItem>
      <MenuItem value={6}>6</MenuItem>
      <MenuItem value={8}>8</MenuItem>
    </TextField>
  );
}
