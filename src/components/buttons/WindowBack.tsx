import { useDispatch } from "react-redux";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";
import backToMainTab from "../../utils/tabClose";

function WindowBack({ page = false }) {
  const dispatch = useDispatch();

  const handleBack = () => {
    backToMainTab({ dispatch });
  };

  return (
    <IconButton title="Back" onClick={() => handleBack()}>
      <NavigateBeforeIcon />
    </IconButton>
  );
}

export default WindowBack;
