import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import { HomeConfig } from "../../pages/HomeConfig";
import { WifiPage } from "../../pages/WifiPage";
import { ConfigPage } from "../../pages/ConfigPage";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeConfig />} />
        <Route path='/wifi' element={<WifiPage />} />
        <Route path='/configuracoes' element={<ConfigPage />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}