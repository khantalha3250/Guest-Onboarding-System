import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GuestFormPage from "../../components/GuestFormPage";

const Guest: React.FC = () => {
  return (
    <>
      <Header />
      <GuestFormPage />
      <Footer />
    </>
  );
};

export default Guest;
