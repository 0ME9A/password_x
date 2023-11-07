import { Box, Fab, List, ListItem, Typography, useTheme } from "@mui/material";
import {
  BiLogoFigma,
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiWorld,
} from "react-icons/bi";

const followUs = [
  {
    name: "Twitter",
    url: "https://twitter.com/@baliramStrikes",
    icon: <BiLogoTwitter />,
  },
  {
    name: "GitHub",
    url: "https://github.com/0ME9A",
    icon: <BiLogoGithub />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/baliram-singh",
    icon: <BiLogoLinkedin />,
  },
  {
    name: "Figma",
    url: "https://figma.com/@ome9a",
    icon: <BiLogoFigma />,
  },
  {
    name: "Portfolio",
    url: "https://ome9a.com",
    icon: <BiWorld />,
  },
];

function Social() {
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontSize: "1rem", fontWeight: "bold", p: 2, pt: 1 }}
      >
        Follow us
      </Typography>
      <List sx={{ display: "flex", gap: 1, px: 2 }}>
        {followUs.map((item, i) => (
          <ListItem key={i} sx={{ width: "fit-content", p: 0 }}>
            <Fab
              size="small"
              title={item.name}
              sx={{
                bgcolor: palette.background.paper,
                ":hover": { backgroundColor: palette.background.default },
                boxShadow: 0,
              }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={item.url}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.6rem",
                  color: palette.text.primary,
                }}
              >
                {item.icon}
              </a>
            </Fab>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Social;
