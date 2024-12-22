import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MainAdminPanel from "../components/MainAdminPanel";

const MainAdmin: React.FC = () => {
  return (
    <>
      <Header />
      <MainAdminPanel />
      <Footer />
    </>
  );
};

export default MainAdmin;
