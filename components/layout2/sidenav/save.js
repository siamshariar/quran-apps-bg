import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import BookmarkList from "../../bookmark/list";
import PinList from "../../pin/list";
import LastReadList from "../../last-read/list";
import Scrollbar from "../../core/scrollbar";
import PinIcon from "../../icons/PinOutline";
import BookmarkBorderIcon from "../../icons/BookmarkBorder";
import AutoStoriesIcon from "../../icons/AutoStories";
import CloseIcon from "../../icons/Close";
import { t } from "../../../lib/config";
import styles from "./save.module.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`save-tabpanel-${index}`}
      aria-labelledby={`save-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `save-tab-${index}`,
    "aria-controls": `save-tabpanel-${index}`,
  };
}

export default function Save({ open, controller }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    open == false ? setValue(0) : setValue(open - 1)
  }, [open])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Scrollbar
      className={open ? `${styles.sidenav} ${styles.open}` : styles.sidenav}
    >
      <span className={styles.close} onClick={controller(false)}>
        <CloseIcon />
      </span>

      <Tabs
        classes={{
          root: styles.tabs,
          indicator: styles.tab_indicator,
        }}
        value={value}
        onChange={handleChange}
        aria-label="Save tabs"
      >
        <Tab
          sx={{ textTransform: "capitalize" }}
          classes={{
            root: styles.tab,
            wrapper: styles.tab_wrapper,
            selected: styles.tab_selected,
          }}
          label={
            <span style={{ display: "flex", alignItems: "center" }}>
              <AutoStoriesIcon style={{ marginRight: "6px" }} />
              {t('Last Read')}
            </span>
          }
          disableRipple
          disableFocusRipple
          {...a11yProps(0)}
        />

        <Tab
          sx={{ textTransform: "capitalize" }}
          classes={{
            root: styles.tab,
            wrapper: styles.tab_wrapper,
            selected: styles.tab_selected,
         }}
          label={
            <span style={{ display: "flex", alignItems: "center" }}>
              <BookmarkBorderIcon style={{ marginRight: "6px" }} />
              {t('Bookmarks')}
            </span>
          }
          disableRipple
          iconPosition="start"
          disableFocusRipple
          {...a11yProps(1)}
        />

        <Tab
          sx={{ textTransform: "capitalize" }}
          classes={{
            root: styles.tab,
            wrapper: styles.tab_wrapper,
            selected: styles.tab_selected,
          }}
          label={
            <span style={{ display: "flex", alignItems: "center" }}>
              <PinIcon style={{ marginRight: "6px" }} />
              {t('Pin')}
            </span>
          }
          disableRipple
          iconPosition="start"
          disableFocusRipple
          {...a11yProps(2)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <LastReadList controller={controller} />
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <BookmarkList controller={controller} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <PinList controller={controller} />
      </TabPanel>
    </Scrollbar>
  );
}
