import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MainAdminLogin from "../components/MainAdminLogin";

const Guest: React.FC = () => {
  return (
    <>
      <Header />
      <MainAdminLogin />
      <Footer />
    </>
  );
};

export default Guest;
