import React from "react";
import styles from "./Paged.module.css";
import { uno, dos } from "../../images/images";

export default function Pagination({
  recipesPerPage,
  allRecipes,
  handlePageChange,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const totalPages = Math.ceil(allRecipes / recipesPerPage);

  const previousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <button className={styles.btnPrimary} onClick={previousPage}>
        <img src={uno} width="10px" height="auto" alt="Next page" />
      </button>

      <ul className={styles.li}>
        {pageNumbers && (
          <>
            {pageNumbers
              .filter((number) => {
                return (
                  number === 1 ||
                  number === currentPage ||
                  number === totalPages ||
                  number === totalPages - 1 ||
                  (number >= currentPage - 2 && number <= currentPage + 2)
                );
              })
              .map((number, index, array) => {
                if (index > 0 && number - array[index - 1] > 1) {
                  return (
                    <li className={styles.li} key={`ellipsis${number - 1}`}>
                      <span style={{ color: "white" }}>...</span>
                    </li>
                  );
                }
                return (
                  <li
                    className={styles.li}
                    key={number}
                    style={
                      number === currentPage
                        ? {
                            backgroundColor: "#646464",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                          }
                        : {}
                    }
                  >
                    <a
                      onClick={() => handlePageChange(number)}
                      style={number === currentPage ? { color: "white" } : {}}
                    >
                      {number}
                    </a>
                  </li>
                );
              })}
          </>
        )}
      </ul>

      <button className={styles.btnPrimary} onClick={nextPage}>
        <img src={dos} width="10px" height="auto" alt="Next page" />
      </button>
    </div>
  );
}
