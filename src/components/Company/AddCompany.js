import "./AddCompany.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import useTranslate from "../../hooks/useTranslate";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpiner";
import { useNavigate } from "react-router-dom";
const AddCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const { isLoading, sendRequest: addCompany } = useHttp();
  const [imgSrc, setImgSrc] = useState({
    imageSrc: "https://comnplayscience.eu/app/images/notfound.png",
    imageFile: {},
  });
  const image = useRef();
  const enName = useRef();
  const arName = useRef();
  const enDesc = useRef();
  const arDesc = useRef();
  const website = useRef();
  const contact = useRef();
  const rate = useRef();
  const imageHandler = (e) => {
    const img = image.current.files[0];
    setImgSrc({
      imageSrc: URL.createObjectURL(img),
      imageFile: img,
    });
  };
  const submitCompany = (e) => {
    e.preventDefault();
    var fd = new FormData();
    fd.append(
      "image",
      image.current.files[0],
      "02-teknova-la_fiesta_(original_mix).png"
    );
    fd.append("rate", rate.current.value);
    fd.append("type", "transport");
    fd.append("website_link", website.current.value);
    fd.append("contact_link", contact.current.value);
    fd.append("ar[description]", arDesc.current.value);
    fd.append("en[description]", enDesc.current.value);
    fd.append("ar[name]", arName.current.value);
    fd.append("en[name]", enName.current.value);
    addCompany(
      {
        url: "https://api.visit-egypt.me/admin/companies/add",
        method: "POST",
        body: fd,
        headers: {
          firebase_id: "7wKs7vlmNjO6PNlBKMa77hsAJYo2",
        },
      },
      (res) => {
        console.log(res);
        navigate("/companies");
      }
    );
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="addCompany">
        <Form className="form" onSubmit={submitCompany}>
          <Row>
            <Col md="3">
              <img src={imgSrc.imageSrc} alt="companyimg  " />
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>{t("Name in English")}</Form.Label>
                <Form.Control type="text" name="enName" ref={enName} required />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group className="mb-3">
                <Form.Label>{t("Name in Arabic")}</Form.Label>
                <Form.Control type="text" name="arName" ref={arName} required />
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
            {t("Add")}
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
export default AddCompany;
