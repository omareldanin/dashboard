import CompaniesList from "../components/Company/CompaniesList";
import { Route, Routes } from "react-router-dom";
import AddCompany from "../components/Company/AddCompany";
import EditCompany from "../components/Company/CompanyEdit";
import CompanyDetails from "../components/Company/CompanyDetails";
const Companies = () => {
  return (
    <Routes>
      <Route path="/" element={<CompaniesList />} />
      <Route path="/add" element={<AddCompany />} />
      <Route path="/edit/:id" element={<EditCompany />} />
      <Route path="/details/:id" element={<CompanyDetails />} />
    </Routes>
  );
};
export default Companies;
