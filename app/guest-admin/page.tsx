import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GuestAdminPanel from "@/app/components/GuestAdminPanel";

const GuestAdmin: React.FC = () => {
  return (
    <>
      <Header />
      <GuestAdminPanel />
      <Footer />
    </>
  );
};

export default GuestAdmin;
