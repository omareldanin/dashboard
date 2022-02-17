import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./CompaniesList.scss";
import LongMenu from "./Actions";
import { useState, useEffect } from "react";
import useTranslate from "../../hooks/useTranslate";
import DeleteCompany from "./DeleteCompany";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { companySliceActions } from "../../store/companySlice";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpiner";
import Pagination from "./pagination/Pagination";
const CompaniesList = () => {
  const dispatch = useDispatch();
  const { isLoading, sendRequest: getCompanies } = useHttp();
  const { isLoading: deleteLoading, sendRequest: deleteCompany } = useHttp();
  const lang = useSelector((state) => state.ui.lang);
  const currentPage = useSelector((state) => state.company.data.currentPage);
  const [deleteDate, setDeleteDate] = useState({
    visiable: false,
    id: null,
  });
  const [rows, setRows] = useState([]);
  const [data, setData] = useState(rows);
  const { t } = useTranslate();
  useEffect(() => {
    getCompanies(
      {
        url: ` https://api.visit-egypt.me/admin/companies?page=${currentPage}`,
        headers: {
          "X-localization": lang,
          firebase_id: "7wKs7vlmNjO6PNlBKMa77hsAJYo2",
        },
      },
      (res) => {
        const rows = res.data.data.map((row) => ({
          id: row.id,
          name: row.name,
          desc: row.description,
          rate: row.rate,
          website: row.website_link,
          contact: row.contact_link,
          type: row.type,
        }));
        setData(rows);
        setRows(rows);
        dispatch(companySliceActions.setPagesNum(res.data.last_page));
        console.log(res.data);
      }
    );
  }, [lang, currentPage]);
  const deleteHandler = () => {
    deleteCompany(
      {
        url: `https://api.visit-egypt.me/admin/companies/delete/${deleteDate.id}`,
        method: "DELETE",
        headers: {
          firebase_id: "7wKs7vlmNjO6PNlBKMa77hsAJYo2",
        },
      },
      (res) => {
        const updatedRows = data.filter((row) => row.id !== deleteDate.id);
        setData(updatedRows);
        setRows(updatedRows);
      }
    );
  };
  const closeDelete = () => {
    setDeleteDate({
      visiable: false,
    });
  };
  const openDelete = (id) => {
    setDeleteDate({
      visiable: true,
      id: id,
    });
  };
  const searchHandler = (e) => {
    const value = e.target.value;
    const filteredData = rows.filter((row) => {
      return row.name?.toLocaleLowerCase().includes(value);
    });

    setData(filteredData);
  };
  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 60,
    },
    {
      field: "name",
      headerName: t("companyName"),
      sortable: false,
      width: 130,
    },
    {
      field: "desc",
      headerName: t("companyDesc"),
      sortable: false,
      width: 160,
    },
    {
      field: "rate",
      headerName: t("companyRate"),
      type: "number",
      width: 70,
    },
    {
      field: "website",
      headerName: t("companyWebsite"),
      sortable: false,
      width: 160,
    },
    {
      field: "contact",
      headerName: t("Contact"),
      sortable: false,
      width: 160,
    },
    {
      field: "type",
      headerName: t("Transport"),
      sortable: false,
      width: 160,
    },
    {
      field: "Actions",
      headerName: t("Actions"),
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return <LongMenu id={params.row.id} openDelete={openDelete} />;
      },
    },
  ];
  return (
    <>
      {isLoading || deleteLoading ? <LoadingSpinner /> : null}
      {deleteDate.visiable && (
        <DeleteCompany
          closeDelete={closeDelete}
          id={deleteDate.id}
          deleteCompany={deleteHandler}
        />
      )}
      <div className="citiesList">
        <input
          type="text"
          placeholder={t("companiesSearch")}
          className="search"
          onChange={searchHandler}
        />
        <Link to="/companies/add" className="addCity">
          {t("companyAddButton")}
        </Link>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableColumnMenu={true}
          disableSelectionOnClick={true}
        />
        <Pagination />
      </div>
    </>
  );
};
export default CompaniesList;
