import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GuestLandingPage from "../components/GuestLandingPage";

const Guest: React.FC = () => {
  return (
    <>
      <Header />
      <GuestLandingPage />
      <Footer />
    </>
  );
};

export default Guest;
