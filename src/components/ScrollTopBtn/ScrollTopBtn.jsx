import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ScrollTopBtn.module.css";
import { GrUpgrade } from "react-icons/gr";
import { setVisible, setIsOnClick } from "../../redux/scroll/scrollActions.js"; 

const ScrollTopBtn = () => {

  const dispatch = useDispatch();
  const visible = useSelector((state) => state.scroll.visible);
  const isOnClick = useSelector((state) => state.scroll.isOnClick);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && ! isOnClick) {
        dispatch(setVisible(true));
      } else {
        dispatch(setVisible(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, isOnClick]);

  const ScrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
    dispatch(setVisible(false));
    dispatch(setIsOnClick(true));
    setTimeout(() => dispatch(setIsOnClick(false)), 1000);
  };

  return (
    <>
      {visible && (
        <button type="button" className={styles.scrollBtn} onClick={ScrollToTop}>
          <GrUpgrade className={styles.icon} />
        </button>
      )}
    </>
  );
};

export default ScrollTopBtn;