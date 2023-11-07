import { Box, List, ListItem, Typography } from "@mui/material";

import FacebookShare from "../buttons/FacebookShare";
import TwitterShare from "../buttons/TwitterShare";
import UrlShare from "../buttons/UrlShare";

const shareUs: JSX.Element[] = [
  <TwitterShare />,
  <FacebookShare />,
  <UrlShare />,
];

function Share() {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontSize: "1rem", fontWeight: "bold", p: 1, px: 2 }}
      >
        Share
      </Typography>
      <List sx={{ display: "flex", px: 2 }}>
        {shareUs.map((item, i) => (
          <ListItem sx={{ width: "fit-content", p: 0 }} key={i}>
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Share;
