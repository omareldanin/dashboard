import "./DeleteCompany.scss";
import useTranslate from "../../hooks/useTranslate";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpiner";
const DeleteCompany = (props) => {
  const { t } = useTranslate();
  return (
    <>
      <div className="model" onClick={props.closeDelete}>
        <div className="deleteBLock">
          <div className="message">{t("deleteMessage")}</div>
          <div className="buttons">
            <button className="cancel" onClick={props.closeDelete}>
              {t("Cancel")}
            </button>
            <button className="delete" onClick={props.deleteCompany}>
              {t("Delete")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteCompany;
