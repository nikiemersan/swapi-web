import React from "react";

import DarthVaderImage from "../../assets/darth-vader.png";

const LoadingPage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img src={DarthVaderImage} alt={""} style={{ height: 160, width: 160 }} />
      <h3 style={{ textAlign: "center" }}>Loading...</h3>
    </div>
  );
};

export default LoadingPage;
