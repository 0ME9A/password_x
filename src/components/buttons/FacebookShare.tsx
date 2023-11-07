import { IconButton } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import React from "react";

const FacebookShare: React.FC = () => {
  const url = "https://password.ome9a.com";

  const handleClick = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <IconButton title="Share on facebook" onClick={handleClick}>
      <FacebookIcon />
    </IconButton>
  );
};

export default FacebookShare;
