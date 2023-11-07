import { IconButton } from "@mui/material";
import { BiLink } from "react-icons/bi";

import React, { useState } from "react";
import copyToClipboard from "../../utils/copyToClipboard";

const UrlShare: React.FC = () => {
  const [clipStatus, setClipStatus] = useState<boolean>(false);

  const url = "https://password.ome9a.com";

  const handleClick = async () => {
    await copyToClipboard(url);
    setClipStatus(true);
    setTimeout(() => {
      setClipStatus(false);
    }, 5000);
  };

  return (
    <IconButton title="Copy Url" onClick={handleClick}>
      <BiLink style={{ color: clipStatus ? "green" : "" }} />
    </IconButton>
  );
};

export default UrlShare;
