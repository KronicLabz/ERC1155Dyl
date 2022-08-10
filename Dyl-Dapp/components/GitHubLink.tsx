import React from "react";

export default function ThirdwebGuideFooter() {
  const url = "https://opensea.io/collection/dyl";
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: -120,
          right: -80,
          height: 300,
          width: 150,
          border: "4px solid #white",
          transform: "rotate(45deg)",
          backgroundColor: " #ff7b08",
          cursor: "pointer",
        }}
        role="button"
        onClick={() => window.open(url, "_blank")}
      />

      <div
        style={{
          position: "fixed",
          bottom: -4,
          right: 1,
        }}
      >
        <img
          src={"/dyl.png"}
          width={80}
          height={80}
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => window.open(url, "_blank")}
        />
      </div>
    </>
  );
}
