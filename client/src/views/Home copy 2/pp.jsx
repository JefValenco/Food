import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Paged from "../../components/Paged/Paged";
import styles from "./Home.module.css";
import style from "./NavBar.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Form from "../../views/Form/Form";
import FormDelete from "../../views/FormDelete/FormDelete";
import { Link } from "react-router-dom";
import { table } from "../.././images/images";
import { plate } from "../.././images/images";
import { lettuce } from "../.././images/images";
import {
  getRecipes,
  FilterByDiet,
  getRecipeDiets,
  FilterByCreated,
  orderByAZ,
  orderByScore,
  getItemByName,
} from "../../redux/actions";

const Home = () => {
  const [showCreateRecipePopup, setShowCreateRecipePopup] = useState(false);

  const handleCreateRecipeClick = () => {
    setShowCreateRecipePopup(true);
  };

  const handleClosePopup = () => {
    setShowCreateRecipePopup(false);
  };
  const allRecipes = useSelector((state) => state.recipes);

  const [isLoading2, setIsLoading2] = useState(false);

  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("");

  const getDiets = useSelector((state) => state.recipeDiets);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(4);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getRecipes()).then(() => {
        setIsLoading(false);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [dispatch]);

  function handleSortDiets(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      console.log(e.target.value);
      dispatch(FilterByDiet(e.target.value));
      setCurrentPage(1);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  useEffect(() => {
    dispatch(getRecipeDiets());
  }, [dispatch]);

  function handleSortCreated(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      dispatch(FilterByCreated(e.target.value));
      setCurrentPage(1);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSort(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      console.log(sortOrder);
      dispatch(orderByAZ(sortOrder));
      setCurrentPage(1);
      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSortScore(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      console.log(sortOrder);
      dispatch(orderByScore(sortOrder));
      setCurrentPage(1);
      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  const handleClearSearch = () => {
    setIsLoading2(true);

    setTimeout(() => {
      dispatch(getItemByName("")).then(() => {
        setIsLoading2(false);
      });
      setSearch("");
    }, 600);
  };

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#cce85d", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className={style.container}>
          <div className={style.links}>
            <Link to="/recipes" className={style.btnPrimary}>
              Recipes
            </Link>
            <button>Create Recipe</button>
            <button
              href="#"
              className={style.btnPrimary}
              onClick={handleCreateRecipeClick}
            >
              Delete Recipe
            </button>
            <Link to="/modify" className={style.btnPrimary}>
              Modify Recipe
            </Link>
            <Link to="/" className={style.btnPrimary}>
              Landing
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.container0}>
        <div
          className={styles.containerSection}
          style={{
            textAlign: "left",
            paddingLeft: "13em",
            paddingTop: "5em",
            position: "relative",
          }}
        >
          {/* Div image fork plate */}
          <div
            className={styles.imageWrapper}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
              maxWidth: "497px",
              maxHeight: "610px",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={plate}
              alt="plate"
              className={styles.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <p className={styles.p}>Fresh Recipes</p>
          <h3 className={styles.h3}>Healthy ingredients</h3>
          <div
            className={styles.imageWrapper}
            style={{
              position: "absolute",

              zIndex: 2,
            }}
          >
            <h1 className={styles.h1}>Spoonacular!</h1>
          </div>
        </div>

        <div
          style={{
            position: "relative",
          }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={lettuce}
              alt="lettuce"
              className={styles.image}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                maxWidth: "152px",
                maxHeight: "477px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className={styles.container3}>
            <div className={styles.box}>
              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortCreated(e)}
              >
                <option value="All">All Created</option>

                <option value="true">Data base</option>
                <option value="false">Api</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortDiets(e)}
              >
                <option value="" disabled selected hidden>
                  Select Diet
                </option>

                <option value="All"> Clear</option>

                <option value=""></option>
                {getDiets &&
                  getDiets
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((diet) => {
                      return (
                        <option value={diet.name} key={diet.id}>
                          {diet.name}
                        </option>
                      );
                    })}
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSort(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Order
                </option>

                <option value="des">A - Z</option>
                <option value="asc">Z - A</option>
                <option value="clear">Clear</option>
              </select>

              <select
                className={styles["style-dropdown"]}
                onChange={(e) => handleSortScore(e)}
              >
                <option value="" disabled selected hidden>
                  Select an Score
                </option>
                <option value="asc">Higher Score</option>
                <option value="des">Lower Score</option>
                <option value="clear">Clear</option>
              </select>
            </div>
            <div className={styles.box}>
              <SearchBar />
            </div>
          </div>
          <div className={styles.container2}>
            <h3 className={styles.h3}>It´s cooking time!</h3>
            <p className={styles.p2}>
              Spoonacular: Unleash your culinary creativity with our tantalizing
              recipe collection.
            </p>{" "}
            <div>
              {currentRecipes.length > 0 ? (
                <CardsContainer currentRecipes={currentRecipes} />
              ) : (
                <div>
                  <div className={styles.content2}>
                    <div>
                      <p className={styles.p}>Oops! Error 404</p>
                      <h1 className={styles.h1}> Page not found.</h1>
                    </div>
                    <div className={styles.contentButton}>
                      <button
                        onClick={handleClearSearch}
                        className={styles.btnPrimary}
                      >
                        Back Home
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Paged
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <Form />

        {isLoading2 && (
          <div>
            <span
              className={styles.loader}
              style={{
                backgroundColor:#cce85d,
                width: "100%",
                height: "100%",
              }}
            ></span>
          </div>
        )}

        <div className={styles.container}>
          <div className={styles.links}>{/* Other navigation links */}</div>
          {showCreateRecipePopup && (
            <div className={styles.popupContainer}>
              <div className={styles.popup}>
                <div className={styles.popupContent}>
                  <div
                    className={styles.closeButton}
                    onClick={handleClosePopup}
                  >
                    <span className={styles.closeIcon}>X</span>
                  </div>
                  <FormDelete />
                </div>
              </div>
              <img
                className={styles.img2}
                src={table}
                alt="Table Image"
                style={{
                  width: "700px",
                  height: "auto",
                  position: "relative",
                  zIndex: 0,
                }}
              />
            </div>
          )}
        </div>
        <div
          className={styles.footer}
          style={{ textAlign: "left", paddingLeft: "8em", paddingTop: "5em" }}
        >
          <p className={styles.p}>Welcome to</p>

          <h1 className={styles.h1}>Spoonacular!</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
