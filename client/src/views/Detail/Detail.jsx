import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getItemById } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const itemById = useSelector((state) => state.itemById);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getItemById(id)).then(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  console.log(
    "state:",
    useSelector((state) => state)
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
  }, []);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#435718", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  const removeTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const summaryWithoutTags = removeTags(itemById.summary);

  const removeTagsSteps = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const summaryWithoutTagsSteps = removeTagsSteps(itemById.steps);

  return (
    <div>
      {" "}
      <div className={styles.contain}>
        {" "}
        <div className={styles.container}>
          <div className={styles["d-lg-flex"]}>
            <div
              className={`${styles.card} border-0 me-lg-4 mb-lg-0 mb-4`}
              style={{ height: "350px" }}
            >
              {" "}
              <div className={styles.pic}>
                <div className={styles.title}>
                  <span className={styles.month}>{itemById.name}</span>
                </div>
              </div>
              <div className={styles.container} style={{ color: "#000000" }}>
                <div className={styles.box} style={{ paddingLeft: "0em" }}>
                  <img
                    className={styles.img}
                    src={itemById.image}
                    width="250"
                    height="250"
                    alt="img"
                    style={{
                      borderRadius: "4px",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <div
                  className={styles.box}
                  style={{
                    paddingLeft: "1em",
                    paddingRight: "1em",
                  }}
                >
                  <h3 className={styles.label}>Name: </h3>
                  <p>{itemById.name}</p>
                  <h3 className={styles.label}>ID: </h3>
                  <p>{itemById.id}</p>

                  <h3 className={styles.label}>Score: </h3>
                  <p>{itemById.score}</p>
                  <h3 className={styles.label}>Diets:</h3>
                  {Array.isArray(itemById.diets) ? (
                    <p>
                      {itemById.diets
                        .map((diet) => diet.name || diet)
                        .join(", ")}
                    </p>
                  ) : (
                    <p>{itemById.diets || "No diets available"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contain}>
        {" "}
        <div className={styles.container}>
          <div className={styles["d-lg-flex"]}>
            <div
              className={`${styles.card} border-0 me-lg-4 mb-lg-0 mb-4`}
              style={{ height: "auto" }}
            >
              {" "}
              <div className={styles.pic}>
                <div className={styles.title}>
                  <span className={styles.month}>{itemById.name}</span>
                </div>
              </div>
              <div className={styles.container} style={{ color: "#000000" }}>
                <div
                  className={styles.box}
                  style={{
                    paddingLeft: "1em",
                    paddingRight: "1em",
                    /*   width: "600px", */
                  }}
                >
                  <h3 className={styles.label}>Summary: </h3>
                  <p>{summaryWithoutTags}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contain}>
        {" "}
        <div className={styles.container}>
          <div className={styles["d-lg-flex"]}>
            <div
              className={`${styles.card} border-0 me-lg-4 mb-lg-0 mb-4`}
              style={{ height: "auto" }}
            >
              {" "}
              <div className={styles.pic}>
                <div className={styles.title}>
                  <span className={styles.month}>{itemById.name}</span>
                </div>
              </div>
              <div className={styles.container} style={{ color: "#000000" }}>
                <div className={styles.box} style={{ paddingRight: "1em" }}>
                  {" "}
                  <h3 className={styles.label}>Steps: </h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {Array.isArray(itemById.steps) ? (
                      itemById.steps.map((step, index) => (
                        <li key={index}>
                          <h1 className={styles.h1}>Step {step.number}:</h1>
                          <p>{step.step}</p>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div>
                          {JSON.parse(itemById.steps).map(
                            ({ number, step }) => (
                              <div key={number}>
                                <div
                                  style={{
                                    marginTop: "0.5rem",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  Step {number}:
                                </div>
                                <div>{step}</div>
                              </div>
                            )
                          )}
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className={styles.button}>
                <Link to="/recipes">
                  <button
                    className={styles.Submmit}
                    style={{
                      marginBottom: "1em",
                    }}
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
