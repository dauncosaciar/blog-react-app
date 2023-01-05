/* Componente que muestra el formulario de actualización de los datos de un usuario */

import React, { useState, useCallback } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { USER_URL_HOST } from "../../utils/constants";
import Camera from "../../assets/img/camera.svg";
import { uploadAvatarApi, updateInfoApi } from "../../api/user";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue(user));

  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ? `${USER_URL_HOST}/obtenerAvatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });
  const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setLoading(true);

    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Error uploading the new avatar");
      });
    }

    await updateInfoApi(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Oops! An error occurred while trying to update your profile data");
      });

    setLoading(false);
    window.location.reload();
  };

  // console.log(user);

  return (
    <div className="edit-user-form">
      <div
        className="avatar"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <img src={Camera} alt="Camera" />
      </div>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
        <Form.Item label="First Name">
          <Input name="name" value={formData.name} onChange={onChange} />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input name="lastName" value={formData.lastName} onChange={onChange} />
        </Form.Item>
        <Form.Item label="Location">
          <Input name="location" value={formData.location} onChange={onChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ xs: { offset: 0, span: 24 }, sm: { offset: 8, span: 16 } }}>
          <Button type="primary" htmlType="submit">
            {!loading ? (
              "Update profile"
            ) : (
              <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} />} />
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function initialFormValue(user) {
  return {
    name: user.name || "",
    lastName: user.lastName || "",
    location: user.location || ""
  };
}
