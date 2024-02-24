import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const Loader = ({ loaded }) => {
  return (
    <div className={`${styles.root} ${loaded ? styles.loaded : ""}`}>
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
