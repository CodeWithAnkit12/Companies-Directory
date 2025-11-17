import companies from '../../public/companies.json';
export async function fetchCompanies() {
// simulate network latency
await new Promise(r => setTimeout(r, 350))
return companies
}