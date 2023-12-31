import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { chromeStoragePropsType } from "../../components/types/PasswordAttributesType";
import { HistoryItem } from "../../RTK/slices/history";
import { useEffect, useState } from "react";
import { RootState } from "../../RTK/store";
import { useSelector } from "react-redux";
import { HISTORY } from "../../RTK/type";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import WindowBack from "../../components/buttons/WindowBack";
import copyToClipboard from "../../utils/copyToClipboard";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

interface copyHistoryItemFace {
  id: string;
  password: string;
}

function History({ page = false }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectHistoryItem, setSelectHistoryItem] = useState<string[]>([]);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const { activeWindow } = useSelector((state: RootState) => state);
  const [copyPassword, setCopyPassword] = useState<copyHistoryItemFace>({
    id: "",
    password: "",
  });

  const palette = theme.palette;

  const handleHistoryItemSelection = (historyId: string) => {
    if (selectHistoryItem.includes(historyId)) {
      const uncheck = selectHistoryItem.filter((id) => id !== historyId);
      setSelectHistoryItem(uncheck);
    } else {
      setSelectHistoryItem((prev) => [...prev, historyId]);
    }
  };

  const handleSelectAll = () => {
    const allHistoryId = historyData.map((item) => item.time);
    if (historyData.length === selectHistoryItem.length) {
      setSelectHistoryItem([]);
      return;
    }
    setSelectHistoryItem(allHistoryId);
  };

  const handleCopy = async ({ id, password }: copyHistoryItemFace) => {
    await copyToClipboard(password);
    setCopyPassword({ id, password });

    setTimeout(() => {
      setCopyPassword({ id: "", password: "" });
    }, 5000);
  };

  const handleDelete = () => {
    try {
      // Get the current array from storage
      window.chrome.storage.sync.get(
        ["history"],
        (result: chromeStoragePropsType) => {
          let pHistory = result.history || [];

          // Modify the array. For example, delete/remove all those objects which time's value present in selectedHistoryItem
          const deleteHistoryItem = pHistory.filter(
            (item) => !selectHistoryItem.includes(item.time)
          );

          // Store the updated array back in storage
          window.chrome.storage.sync.set({ history: deleteHistoryItem }, () => {
            setHistoryData(deleteHistoryItem.reverse()); // Update state with the reversed array
            setSelectHistoryItem([]); // Update state with the reversed array
          });
        }
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    try {
      // Store the updated array back in storage
      window.chrome.storage.sync.get(
        ["history"],
        (result: chromeStoragePropsType) => {
          setHistoryData(result.history.reverse());
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          backgroundColor: palette.background.paper,
          position: "relative",
          top: 0,
          width: "100%",
          transition: ".3s",
          // maxHeight: "600px",
          zIndex: activeWindow.tab === HISTORY ? 5 : 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animationDuration: activeWindow.timer || 0,
        }}
        className={`${
          activeWindow.tab === HISTORY && !page && "windowSlideStartRight"
        } ${activeWindow.timer && !page && "windowSlideEndRight"} `}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WindowBack page={page} />
            <Typography
              variant="h2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              History
              <span className="verticalDivider"></span>
              {selectHistoryItem.length} / {historyData.length}
            </Typography>
          </Box>
          <Box sx={{}}>
            <Button
              variant="contained"
              onClick={handleDelete}
              title="Delete history"
              sx={{
                gap: 1,
                borderRadius: 2,
                minWidth: 0,
                bgcolor: "red",
                p: small ? 0.5 : "auto",
                fontWeight: "bold",
                ":hover": { bgcolor: "rgb(140, 0, 0)" },
              }}
            >
              {!small && "Delete"}
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
        <hr />

        {historyData.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              px: 2,
            }}
          >
            <div></div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: ".9rem",
                  px: 1,
                }}
              >
                Select All
              </Typography>

              <Checkbox
                checked={selectHistoryItem.length === historyData.length}
                onChange={handleSelectAll}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
          </Box>
        )}
        <hr />

        {historyData?.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: "center" }}>
            No record found.
          </Typography>
        ) : (
          <List dense>
            {historyData.map((item, i) => {
              const time = new Date(item.time);
              return (
                item.password.length > 0 && (
                  <ListItem
                    alignItems="center"
                    key={i}
                    sx={{
                      borderBottom: 0.5,
                      borderColor: "rgb(150, 150, 150, .1)",
                    }}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{
                            fontWeight: "bold",
                            paddingBottom: ".5rem",
                            fontSize: "1rem",
                          }}
                        >
                          {item.password}
                        </span>
                      }
                      sx={{ fontSize: "1rem", fontWeight: "bold" }}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            fontSize={"0.8rem"}
                          >
                            {"Password strength —  "}
                          </Typography>
                          <span
                            style={{
                              display: "inline",
                              color: item.strength.color,
                            }}
                          >
                            {item.strength.message}
                          </span>
                          <span style={{ opacity: 0.7, display: "block" }}>
                            Time:- {time.toLocaleTimeString()}
                          </span>
                        </>
                      }
                    />

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleCopy({ id: item.time, password: item.password })
                        }
                        title={`${
                          copyPassword.id === item.time ? "Copied" : "Copy"
                        }`}
                        sx={{
                          p: ".5",
                          m: 0,
                          minWidth: "0",
                          borderRadius: 2,
                          color: `${
                            copyPassword.id === item.time ? "green" : ""
                          }`,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ContentPasteIcon />
                      </IconButton>
                      <span className="verticalDivider"></span>
                      <Checkbox
                        checked={selectHistoryItem.includes(item.time)}
                        onChange={() => handleHistoryItemSelection(item.time)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                  </ListItem>
                )
              );
            })}
          </List>
        )}
      </Paper>
    </>
  );
}

export default History;
