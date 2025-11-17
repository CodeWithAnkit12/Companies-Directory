import companies from '../data/companies.json'
export async function fetchCompanies() {
// simulate network latency
await new Promise(r => setTimeout(r, 350))
return companies
}