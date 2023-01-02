/* Componente principal de la aplicación */

import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import configRouting from "./routes/configRouting";
import MenuTop from "./components/MenuTop";
import Footer from "./components/Footer";

export default function App() {
  const { Header, Content } = Layout;

  return (
    <>
      <Layout>
        <Router>
          <Header style={{ zIndex: 1 }}>
            <MenuTop />
          </Header>
          <Content>
            <Routes>
              {configRouting.map((route, index) => (
                <Route key={index} path={route.path} element={<route.page />} />
              ))}
            </Routes>
          </Content>
          <Footer />
        </Router>
      </Layout>
    </>
  );
}
