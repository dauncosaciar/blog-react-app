/* Componente que muestra la página de Registro / Login */

import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import Logo from "../../assets/img/logo.svg";
import BasicModal from "../BasicModal";
import SignInForm from "../SignInForm";
import SignUpForm from "../SignUpForm";

import "./SignInSignUp.scss";

export default function SignInSignUp() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  return (
    <div className="signin-signup">
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col span={24}>
          <div className="signin-signup__content">
            <img src={Logo} alt="Blog React App" />
            <h1>Registro / Login de Usuarios</h1>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
            >
              Sign Up
            </Button>
            <Button onClick={() => openModal(<SignInForm />)}>Sign In</Button>
          </div>
        </Col>
      </Row>

      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}
