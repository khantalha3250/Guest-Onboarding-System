import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GuestAdminLogin from "../components/GuestAdminLogin";

const Guest: React.FC = () => {
  return (
    <>
      <Header />
      <GuestAdminLogin />
      <Footer />
    </>
  );
};

export default Guest;
