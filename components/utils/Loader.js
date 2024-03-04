import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.root}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#466548"
        secondaryColor="#466548"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
