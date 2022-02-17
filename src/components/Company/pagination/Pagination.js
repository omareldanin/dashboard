import "./pagination.scss";
import PaginationItem from "./PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import { companySliceActions } from "../../../store/companySlice";
const Pagination = () => {
  const pages = useSelector((state) => state.company.data.pages);
  const currentPage = useSelector((state) => state.company.data.currentPage);
  const dispatch = useDispatch();
  const items = [];
  for (let i = 0; i < pages; i++) {
    items.push(<PaginationItem key={i} num={i + 1} />);
  }
  const previousHandler = () => {
    dispatch(companySliceActions.setPrePage());
  };
  const nextHandler = () => {
    dispatch(companySliceActions.setNextPage());
  };

  return (
    <div className="pagination">
      <div
        className={`pre ${currentPage === 1 ? "disabled" : ""}`}
        onClick={previousHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </div>
      <div className="items">{items.map((item) => item)}</div>
      <div
        className={`next ${currentPage === pages ? "disabled" : ""}`}
        onClick={nextHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </div>
    </div>
  );
};
export default Pagination;
