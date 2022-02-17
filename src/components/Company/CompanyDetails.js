import "./CompanyDetails.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpiner";
const CompanyDetails = () => {
  const { isLoading, sendRequest: getCompanyData } = useHttp();
  const lang = useSelector((state) => state.ui.lang);
  const [data, setData] = useState({
    image: "",
    id: 0,
    enName: "",
    enDesc: "",
    arName: "",
    arDesc: "",
    rate: "",
    website: "",
    contact: "",
    type: "",
  });
  const { t } = useTranslate();
  const param = useParams();
  const rateElments = [];
  useEffect(() => {
    getCompanyData(
      {
        url: `https://api.visit-egypt.me/admin/companies/${param.id}`,
        headers: {
          "X-localization": "en",
          firebase_id: "7wKs7vlmNjO6PNlBKMa77hsAJYo2",
        },
      },
      (res) => {
        const result = res.data.map((row) => ({
          image: row.image_path,
          id: row.id,
          enName: row.name,
          enDesc: row.description,
          arName: row.translations[0].name,
          arDesc: row.translations[0].description,
          rate: row.rate,
          website: row.website_link,
          contact: row.contact_link,
          type: row.type,
        }));
        setData(result[0]);
      }
    );
  }, [param.id]);
  const rate = (num) => {
    for (let i = 0; i < num; i++) {
      rateElments.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }
  };
  rate(parseInt(data.rate));
  return (
    <div className="companyDetails">
      {isLoading && <LoadingSpinner />}
      <Row>
        <Col sm="4">
          <img src={data.image} alt="detailsimg" />
        </Col>
        <Col sm="8" className="companyInfo">
          <h3>{lang === "en" ? data.enName : data.arName}</h3>
          <div className="rate">{rateElments.map((star) => star)}</div>
          <p className="type">
            <span>{t("type")} : </span>
            {t("Transport")}
          </p>
          <p>
            <span>
              {t("Website Link")} : {data.website}
            </span>
          </p>
          <p>
            <span>
              {t("Contact Link")} : {data.contact}
            </span>
          </p>
        </Col>
        <Col lg="12" className="description">
          <h4>{t("Description")}</h4>
          <p>{lang === "en" ? data.enDesc : data.arDesc}</p>
        </Col>
      </Row>
    </div>
  );
};
export default CompanyDetails;
