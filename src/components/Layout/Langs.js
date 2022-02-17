import "./Langs.scss";
import { useSelector, useDispatch } from "react-redux";
import { uiSliceActions } from "../../store/uiSlice";
const Langs = () => {
  const lang = useSelector((state) => state.ui.lang);
  const dispatch = useDispatch();
  const langHandler = (e) => {
    dispatch(uiSliceActions.setLang(e.target.value));
  };
  return (
    <div className="langs">
      <select value={lang} onChange={langHandler}>
        <option value="en">En</option>
        <option value="ar">Ar</option>
      </select>
    </div>
  );
};
export default Langs;
