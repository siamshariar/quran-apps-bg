import { useState, useEffect, useContext } from "react";
import { SidenavContext } from "../../../contexts/SidenavContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import BookmarkList from "./bookmark-list";
import PinList from "./pin-list";
import LastReadList from "./last-read-list";
import PinIcon from "../../icons/PinOutline";
import BookmarkBorderIcon from "../../icons/BookmarkBorder";
import AutoStoriesIcon from "../../icons/AutoStories";
import styles from "./index.module.scss";

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
          classes={{
            root: styles.tab,
            wrapper: styles.tab_wrapper,
          }}
          icon={<BookmarkBorderIcon />}
          label="Bookmarks"
          disableRipple
          disableFocusRipple
          {...a11yProps(0)}
        />

        <Tab
          classes={{
            root: styles.tab,
            wrapper: styles.tab_wrapper,
          }}
          icon={<PinIcon />}
          label="Pin"
          disableRipple
          disableFocusRipple
          {...a11yProps(1)}
        />

        <Tab
          classes={{
            root: styles.tab,
            wrapper: styles.tab_wrapper,
          }}
          icon={<AutoStoriesIcon />}
          label="Last Read"
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
