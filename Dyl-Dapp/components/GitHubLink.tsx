import styles from "../../styles/Thirdweb.module.css";
import React from "react";

export default function ThirdwebGuideFooter() {
  const url = "https://itslit.org/";
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: -120,
          right: -80,
          height: 300,
          width: 150,
          border: "1px solid #eaeaea",
          transform: "rotate(45deg)",
          backgroundColor: " #262935",
          cursor: "pointer",
        }}
        role="button"
        onClick={() => window.open(url, "_blank")}
      />

      <div
        style={{
          position: "fixed",
          bottom: 4,
          right: 8,
        }}
      >
        <img
          src={"/dyl.png"}
          alt="https://lh3.googleusercontent.com/LoDJ2hRF5N69XcTrtVX7uc6gAktlc56g7X3-tNLhI_yKz7X6saB8BSKvbbgJ3AQOVya1xF9mGPnSfoWSzw26G2y2vrpSaqdKbAbv"
          width={70}
          height={70}
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => window.open(url, "_blank")}
        />
      </div>
    </>
  );
}
