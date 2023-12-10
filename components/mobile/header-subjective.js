import Container from "../core/container";
import BackIcon from "../icons/NavigateBefore";
import styles from "./header.module.scss";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function HeaderMobile({ title, backLink }) {
  const router = useRouter()

  const [historyLength, setHistoryLength] = useState(0)

  useEffect(() => {
    setHistoryLength(window.history.length)
  }, [])

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            {backLink && (
              <span
                  className={styles.icon}
                  onClick={historyLength > 2 ? () => router.back() : () => router.push(`${backLink}`)}
              >
                <BackIcon />
              </span>
            )}

            <span className={styles.title}>{title}</span>
          </div>

          <div className={styles.right}></div>
        </div>
      </Container>
    </div>
  );
}
