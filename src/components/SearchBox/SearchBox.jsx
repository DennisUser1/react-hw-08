import { useId } from "react";
import { FaSistrix } from 'react-icons/fa';
import styles from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeNameFilter, changeNumberFilter, selectNameFilter, selectNumberFilter } from "../../redux/filtersSlice.js";

export default function SearchBox() {
  const dispatch = useDispatch();
  
  const filterByName = useSelector(selectNameFilter);
  const filterByNumber = useSelector(selectNumberFilter);

  const nameSearchId = useId();
  const numberSearchId = useId();

  const handleNameSearch = (event) => {
    dispatch(changeNameFilter(event.target.value));
  };

  const handleNumberSearch = (event) => {
    dispatch(changeNumberFilter(event.target.value));
  };

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor={nameSearchId}>
        <div className={styles.inputContainer}>
          <input
            id={nameSearchId}
            type="search"
            name="searchName"
            placeholder="Search by name"
            value={filterByName} 
            onChange={handleNameSearch} 
          />
          <FaSistrix className={styles.iconSearch} />
        </div>
        Find contacts by name
      </label>
      
      <label htmlFor={numberSearchId}>
        <div className={styles.inputContainer}>
          <input
            id={numberSearchId}
            type="search"
            name="searchNumber"
            placeholder="Search by number"
            value={filterByNumber} 
            onChange={handleNumberSearch}
          />
          <FaSistrix className={styles.iconSearch} />
        </div>
        Find contacts by number
      </label>
    </div>
  );
};
