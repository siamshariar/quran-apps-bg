import Container from "../core/container";
import CloseIcon from "../icons/Close";
import styles from "./modal.module.scss";

export default function Modal({ children, open, controller, title }) {
  return (
    <div className={open ? `${styles.modal} ${styles.open}` : styles.modal}>
      <div className={styles.header}>
        <Container>
          <div className={styles.header_inner}>
            <span className={styles.icon} onClick={controller(false)}>
              <CloseIcon />
            </span>
            <span className={styles.title}>{title}</span>
          </div>
        </Container>
      </div>

      <div className={styles.content}>
        <div className={styles.content_inner}>{children}</div>
      </div>
    </div>
  );
}
