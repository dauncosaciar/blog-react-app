/* Componente principal de la aplicación */

import React from "react";
import { Layout } from "antd";
import Routing from "./routes/Routing";
import MenuTop from "./components/MenuTop";

export default function App() {
  const { Header, Content, Footer } = Layout;

  return (
    <>
      <Layout>
        <Header>
          <MenuTop />
        </Header>
        <Content>
          <Routing />
        </Content>
        <Footer>
          <h1>Footer...</h1>
        </Footer>
      </Layout>
    </>
  );
}
