import React from "react";
import { Modal } from "antd";

import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, children } = props;

  return (
    <Modal open={show} onCancel={() => setShow(false)} footer={null}>
      {children}
    </Modal>
  );
}
