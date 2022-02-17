import "./AddCompany.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import useTranslate from "../../hooks/useTranslate";
import { useParams, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpiner";
const EditCompany = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { isLoading, sendRequest: getCompany } = useHttp();
  const { isLoading: isLoadingUpdate, sendRequest: updateCompany } = useHttp();
  const { t } = useTranslate();
  const [companyData, setCompanyData] = useState();
  const [imgSrc, setImgSrc] = useState({
    imageSrc: "",
    imageFile: {},
  });
  const fd = new FormData();
  const image = useRef();
  const enName = useRef();
  const arName = useRef();
  const enDesc = useRef();
  const arDesc = useRef();
  const website = useRef();
  const contact = useRef();
  const rate = useRef();
  useEffect(() => {
    getCompany(
      {
        url: `https://api.visit-egypt.me/admin/companies/${param.id}`,
        headers: {
          "X-localization": "en",
          firebase_id: "7wKs7vlmNjO6PNlBKMa77hsAJYo2",
        },
      },
      (res) => {
        const data = res.data.map((row) => ({
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
        setCompanyData(data[0]);
        setImgSrc({
          imageSrc: data[0].image,
        });
        enName.current.value = data[0].enName;
        arName.current.value = data[0].arName;
        enDesc.current.value = data[0].enDesc;
        arDesc.current.value = data[0].arDesc;
        website.current.value = data[0].website;
        contact.current.value = data[0].contact;
        rate.current.value = data[0].rate;
      }
    );
  }, [param.id]);
  const imageHandler = (e) => {
    const img = image.current.files[0];
    setImgSrc({
      imageSrc: URL.createObjectURL(img),
      imageFile: img,
    });
  };
  const submitCompany = (e) => {
    e.preventDefault();
    fd.append("_method", "PUT");
    fd.append("image", imgSrc.imageFile, imgSrc.imageFile.name);
    updateCompany(
      {
        url: `https://api.visit-egypt.me/admin/companies/update/${param.id}`,
        method: "POST",
        body: fd,
        headers: {
          "X-localization": "en",
          firebase_id: "7wKs7vlmNjO6PNlBKMa77hsAJYo2",
        },
      },
      (res) => {
        navigate("/companies");
      }
    );
  };
  return (
    <>
      {isLoading || isLoadingUpdate ? <LoadingSpinner /> : null}
      <div className="addCompany">
        <Form className="form" onSubmit={submitCompany}>
          <Row>
            <Col md="3">
              <img src={imgSrc.imageSrc} alt="image" />
            </Col>
          </Row>
          <Row>
            <Col md="5">
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  name="image"
                  ref={image}
                  onChange={imageHandler}
                  accept=".png,.jpg,.svg"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>{t("Name in English")}</Form.Label>
                <Form.Control
                  type="text"
                  name="enName"
                  ref={enName}
                  onChange={() => {
                    if (enName.current.value === companyData.enName) {
                      fd.delete("en[name]");
                    } else {
                      fd.set("en[name]", enName.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>{t("Name in Arabic")}</Form.Label>
                <Form.Control
                  type="text"
                  name="arName"
                  ref={arName}
                  onChange={() => {
                    if (arName.current.value === companyData.arName) {
                      fd.delete("ar[name]");
                    } else {
                      fd.set("ar[name]", arName.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Form.Group className="mb-3">
                <Form.Label>{t("Description in English")}</Form.Label>
                <textarea
                  type="text"
                  name="enDesc"
                  ref={enDesc}
                  rows="3"
                  onChange={() => {
                    if (enDesc.current.value === companyData.enDesc) {
                      fd.delete("en[description]");
                    } else {
                      fd.set("en[description]", enDesc.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Group className="mb-3">
                <Form.Label>{t("Description in Arabic")}</Form.Label>
                <textarea
                  type="text"
                  name="arDesc"
                  ref={arDesc}
                  rows="3"
                  onChange={() => {
                    if (arDesc.current.value === companyData.arDesc) {
                      fd.delete("ar[description]");
                    } else {
                      fd.set("ar[description]", arDesc.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <Form.Group className="mb-3">
                <Form.Label>{t("Website Link")}</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  ref={website}
                  onChange={() => {
                    if (website.current.value === companyData.website) {
                      fd.delete("website_link");
                    } else {
                      fd.set("website_link", website.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group className="mb-3">
                <Form.Label>{t("Contact Link")}</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  ref={contact}
                  onChange={() => {
                    if (contact.current.value === companyData.contact) {
                      fd.delete("contact_link");
                    } else {
                      fd.set("contact_link", contact.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="2">
              <Form.Group className="mb-3">
                <Form.Label>{t("Rate")}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  name="rate"
                  ref={rate}
                  onChange={() => {
                    if (rate.current.value === companyData.rate) {
                      fd.delete("rate");
                    } else {
                      fd.set("rate", rate.current.value);
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Label>{t("type")}</Form.Label>
              <Form.Select name="type">
                <option>{t("Transport")}</option>
              </Form.Select>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            {t("Save")}
          </Button>
          <Button
            className="cancel"
            onClick={() => {
              navigate("/companies");
            }}
          >
            {t("Cancel")}
          </Button>
        </Form>
      </div>
    </>
  );
};
export default EditCompany;
