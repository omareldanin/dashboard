import { useDispatch, useSelector } from "react-redux";
import { companySliceActions } from "../../../store/companySlice";
const PaginationItem = (props) => {
  const currentPage = useSelector((state) => state.company.data.currentPage);
  const dispatch = useDispatch();
  const pageHandler = (e) => {
    dispatch(companySliceActions.setPage(props.num));
  };
  return (
    <span
      onClick={pageHandler}
      className={currentPage === props.num ? "Pageactive" : ""}
    >
      {props.num}
    </span>
  );
};
export default PaginationItem;
