import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainAdmin = () => {
  return (
    <>
      <Sidebar />
      <div className="right-side">
        <Header />

        <div style={{ display: "flex", height: "100%" }}>
          <div className="content-container" id="content-file-container"></div>
        </div>
      </div>
    </>
  );
};

export default MainAdmin;
