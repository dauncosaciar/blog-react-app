/* Componente formulario de Registro */

import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    let validCount = 0; // Cuenta la cantidad de campos en el form que se han rellenado
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    // Si no se han completado los cinco (5) campos que tiene el form, mostrar una advertencia
    if (validCount !== size(formData)) {
      toast.warning("Complete all the fields of the form");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("The email you entered is invalid");
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Your password has to be the same");
      } else if (size(formData.password) < 6) {
        toast.warning("Your password must have at least 6 characters");
      } else {
        setSignUpLoading(true);
        signUpApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("Your user has been registered successfully");
              setShowModal(false);
              setFormData(initialFormValue());
            }
          })
          .catch(() => {
            toast.error("Server error, please try to register later");
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-form">
      <h2>Create your account</h2>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
        <Form.Item label="First Name">
          <Input name="name" value={formData.name} onChange={onChange} />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input name="lastName" value={formData.lastName} onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "The input is not valid Email!" }]}
        >
          <Input name="email" value={formData.email} onChange={onChange} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password name="password" value={formData.password} onChange={onChange} />
        </Form.Item>
        <Form.Item label="Repeat password">
          <Input.Password
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ xs: { offset: 0, span: 24 }, sm: { offset: 8, span: 16 } }}>
          <Button type="primary" htmlType="submit">
            {!signUpLoading ? (
              "Register"
            ) : (
              <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} />} />
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: ""
  };
}
