import { useState, useEffect, useContext } from "react";
import { SidenavContext } from "../../../contexts/SidenavContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import BookmarkList from "./bookmark-list";
import PinList from "./pin-list";
import LastReadList from "./last-read-list";
import PinIcon from "../../icons/PinOutline";
import BookmarkBorderIcon from "../../icons/BookmarkBorder";
import AutoStoriesIcon from "../../icons/AutoStories";
import styles from "./index.module.scss";
import { t } from "../../../lib/config";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bookmark-tabpanel-${index}`}
      aria-labelledby={`bookmark-tab-${index}`}
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
    id: `bookmark-tab-${index}`,
    "aria-controls": `bookmark-tabpanel-${index}`,
  };
}

export default function Save() {
  const { bookmarkOpen, changeBookmarkOpen } = useContext(SidenavContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    bookmarkOpen == false ? setValue(0) : setValue(bookmarkOpen - 1);
  }, [bookmarkOpen]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeBookmarkOpen(newValue == 0 ? false : newValue + 1);
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        classes={{
          root: styles.tabs,
          indicator: styles.tab_indicator,
        }}
        value={value}
        onChange={handleChange}
        aria-label="Bookmark tabs"
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
              <BookmarkBorderIcon style={{ marginRight: "6px" }} />
              {t('Bookmarks')}
            </span>
          }
          disableRipple
          iconPosition="start"
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
              <PinIcon style={{ marginRight: "6px" }} />
              {t('Pin')}
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
              <AutoStoriesIcon style={{ marginRight: "6px" }} />
              {t('Last Read')}
            </span>
          }
          disableRipple
          disableFocusRipple
          {...a11yProps(2)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <BookmarkList />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PinList />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <LastReadList />
      </TabPanel>
    </div>
  );
}
