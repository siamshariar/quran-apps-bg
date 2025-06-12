import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classNames from "classnames";
import CloseIcon from "../icons/Close";
import styles from "./ModalPrimary.module.scss";
import css from "../core/scrollbar.module.scss";
import { t } from "../../lib/config"

const style = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
    maxHeight: "85vh",
    maxWidth: "85vw",
    bgcolor: "var(--bg11)",
    boxShadow: 24,
    p: 0,
    paddingTop: 1,
    paddingBottom: 1,
  },
};

const PrimaryModal = ({ open, closer, title, content }) => {
  // const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    closer(false)(e);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={open} timeout={500}>
        <Box sx={style.wrapper}>
          <div className={classNames(css.scrollbar, styles.scrollbar)}>
            <Typography variant="h6" component="div">
              <div className={styles.header}>
                {title && title !== t("Translations") && <p className={styles.title}>{title}</p>}
                <button
                  className={styles.close}
                  onClick={(e) => handleClose(e)}
                >
                  <CloseIcon />
                </button>
              </div>
            </Typography>
            <Typography component="div">{content}</Typography>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PrimaryModal;
