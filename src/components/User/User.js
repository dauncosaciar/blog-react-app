/* Componente que muestra la información del usuario logueado */

import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getUserApi } from "../../api/user";
import { logoutApi } from "../../api/auth";
import { USER_URL_HOST } from "../../utils/constants";
import Loading from "../Loading";
import BasicModal from "../BasicModal";
import EditUserForm from "../EditUserForm";
import DefaultBanner from "../../assets/img/default_banner.jpg";
import AvatarNotFound from "../../assets/img/avatar_not_found.png";

import "./User.scss";

export default function User(props) {
  const { setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const userLogged = useAuth();

  const urlAvatar = user?.avatar ? `${USER_URL_HOST}/obtenerAvatar?id=${user.id}` : AvatarNotFound;

  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  useEffect(() => {
    setSignUpLoading(true);
    getUserApi(userLogged._id)
      .then((response) => {
        if (!response) toast.error("The user you have visited does not exist");
        setUser(response);
      })
      .catch(() => {
        toast.error("The user you have visited does not exist");
      })
      .finally(() => {
        setSignUpLoading(false);
      });
  }, [userLogged]);

  if (signUpLoading) {
    return <Loading />;
  }

  return (
    <div className="user">
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col xs={24} xl={{ offset: 6, span: 12 }}>
          <div className="user__avatarbanner">
            <div className="banner" style={{ backgroundImage: `url("${DefaultBanner}")` }} />
            <div className="avatar" style={{ backgroundImage: `url("${urlAvatar}")` }} />
          </div>
          <div className="user__info">
            <div className="title">
              <h2>
                {user ? `${user.name} ${user.lastName}` : "User Not Found"}
                <span className="email">{user ? `${user.email}` : null}</span>
              </h2>
              <div className="options">
                <Button
                  type="primary"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    openModal(
                      <EditUserForm
                        setRefreshCheckLogin={setRefreshCheckLogin}
                        user={user}
                        setShowModal={setShowModal}
                      />
                    );
                  }}
                >
                  Edit profile
                </Button>
                <Button onClick={logout}>Logout</Button>
              </div>
            </div>
            <div className="content">
              {user?.location && (
                <p className="location">
                  <HomeOutlined /> {user.location}
                </p>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}
