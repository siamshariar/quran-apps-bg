import { useState, useEffect } from "react";
//import Link from 'next/link'
import { useRouter } from "next/router";
import Container from "../core/container";
//import IconButton from '@material-ui/core/IconButton'
import BackIcon from "../icons/NavigateBefore";
import styles from "./header.module.scss";

export default function HeaderMobile({ title }) {
  const router = useRouter();

  const [historyLength, setHistoryLength] = useState(0);

  useEffect(() => {
    setHistoryLength(window.history.length);
  }, []);

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <span
              className={styles.icon}
              onClick={
                historyLength > 2 ? () => router.back() : () => router.push("/")
              }
            >
              <BackIcon />
            </span>
            <span className={styles.title}>{title}</span>
          </div>

          <div className={styles.right}></div>
        </div>
      </Container>
    </div>
  );
}
