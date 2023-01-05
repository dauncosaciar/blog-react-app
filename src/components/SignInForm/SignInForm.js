/* Componente formulario de Login */

import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInApi, setTokenApi } from "../../api/auth";

import "./SignInForm.scss";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    console.log(formData);

    let validCount = 0; // Cuenta la cantidad de campos en el form que se han rellenado
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Complete all the fields of the form");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("The email you entered is invalid");
      } else {
        setSignUpLoading(true);
        signInApi(formData)
          .then((response) => {
            if (response.message) {
              toast.warning(response.message);
            } else {
              setTokenApi(response.token);
              setRefreshCheckLogin(true);
            }
          })
          .catch(() => {
            toast.error("Server error, please try to access later");
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
    <div className="signin-form">
      <h2>Login</h2>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
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
        <Form.Item wrapperCol={{ xs: { offset: 0, span: 24 }, sm: { offset: 8, span: 16 } }}>
          <Button type="primary" htmlType="submit">
            {!signUpLoading ? (
              "Login"
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
    email: "",
    password: ""
  };
}
