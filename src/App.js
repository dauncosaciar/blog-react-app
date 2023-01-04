/* Componente principal de la aplicación */

import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLoggedApi } from "./api/auth";
import ConfigRouting from "./routes/ConfigRouting";
import MenuTop from "./components/MenuTop";
import Footer from "./components/Footer";

export default function App() {
  const { Header, Content } = Layout;
  const routes = ConfigRouting();

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedApi());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      <Layout>
        <Router>
          <Header style={{ zIndex: 1 }}>
            <MenuTop />
          </Header>
          <Content>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.page setRefreshCheckLogin={setRefreshCheckLogin} />}
                />
              ))}
            </Routes>
          </Content>
          <Footer />
        </Router>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  );
}
