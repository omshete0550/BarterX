import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TabPanel.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [popup, setPop] = useState(false);
  const handleClickOpen = () => {
    setPop(!popup);
  };

  const closePopup = () => {
    setPop(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "90%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "#ccc", height: "85%" }}
      >
        <Tab
          label="Overview"
          {...a11yProps(0)}
          sx={{
            // marginLeft: "-60px",
            marginTop: "20px",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        />
        <Tab
          label="Order History"
          {...a11yProps(1)}
          sx={{
            // marginLeft: "-16px",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        />
        <Tab
          label="Addresses"
          {...a11yProps(3)}
          sx={{
            // marginLeft: "-48px",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        />
        <Tab
          label="Profile"
          {...a11yProps(4)}
          sx={{
            // marginLeft: "-75px",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        />
      </Tabs>

      <TabPanel value={value} index={0}>

      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <h1>Your Orders</h1>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>

      </TabPanel>

      <TabPanel value={value} index={3}>

      </TabPanel>

    </Box>
  );
}
