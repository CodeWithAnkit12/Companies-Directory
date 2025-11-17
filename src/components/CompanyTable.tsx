import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CompanyCard from "./CompanyCard";

type Company = {
  id: number;
  name: string;
  location: string;
  industry: string;
  employees: number;
  website: string;
};

export default function CompanyTable({ data }: { data: Company[] }) {
  if (data.length === 0) {
    return (
      <div style={{ padding: 24, fontSize: 18 }}>
        No companies match your filters.
      </div>
    );
  }

  return (
    <Box maxWidth="1300px" mx="auto">
      <Grid container spacing={4} justifyContent="center">
        {data.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <CompanyCard c={c} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
