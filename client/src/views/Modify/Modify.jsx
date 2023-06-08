import { useState } from "react";
import styles from "../../views/Modify/Modify.module.css";
import axios from "axios";
import { getRecipeDiets } from "../../redux/actions";
import { getModifyRecipes } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";
/* import SearchBar from "../../components/SearchBar/SearchBar"; */
import { foody } from "../.././images/images.js";

const Modify = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  //----------States----------//

  const [formModify, setFormModify] = useState({
    id: "",
    name: "",
    summary: "",
    score: "",
    steps: [
      { number: 1, step: "" },
      { number: 2, step: "" },
      { number: 3, step: "" },
    ],
    image: "",
    diets: [],
  });

  //----------Reset States----------//

  const resetFormModify = () => {
    setFormModify({
      id: "",
      name: "",
      summary: "",
      score: "",
      steps: [
        { number: 1, step: "" },
        { number: 2, step: "" },
        { number: 3, step: "" },
      ],
      image: "",
      diets: [],
    });
  };

  //----------Change Handlers----------//

  const changeHandlerModify = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "name") {
      const selectedRecipe = recipes.find((recipe) => recipe.name === value);
      setFormModify({
        ...formModify,
        [property]: value,
        id: selectedRecipe?.id || "",
      });
    } else {
      setFormModify({ ...formModify, [property]: value });
    }
  };

  const changeHandlerDiet = (event) => {
    const value = event.target.value;

    if (!formModify.diets.includes(value)) {
      setFormModify({ ...formModify, diets: [...formModify.diets, value] });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your Recipe." },
    { field: "summary", message: "Please enter a summary for your Recipe." },
    { field: "score", message: "Please enter the score for your Recipe." },
    { field: "steps", message: "Please enter the steps for your Recipe." },
    { field: "diets", message: "Please enter the diets for your Recipe." },
    { field: "image", message: "Please enter the image URL for your Recipe." },
  ];

  //----------Summit Handlers----------//

  const submitHandlerModify = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!formModify[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one type is selected

    if (formModify.diets.length === 0 || formModify.diets.includes("")) {
      alert("Please select at least one diet for your Recipe.");
      return;
    }

    // Send formModify data to server
    axios
      .put("/recipe", formModify)
      .then((res) => {
        alert("Recipe updated!");
        resetFormModify();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getRecipeDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getModifyRecipes());
  }, [dispatch]);

  //---------- Selectors ----------//

  const recipes = useSelector((state) => state.modifyItem);

  const recipeDiets = useSelector((state) => state.recipeDiets);

  //----------Complementary fn ----------//

  const removeDiet = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newDiet = [...formModify.diets];
    newDiet.splice(index, 1);
    setFormModify({ ...formModify, diets: newDiet });
  };

  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [score, setScore] = useState("");
  const [steps, setSteps] = useState([]);
  const [diets, setDiets] = useState([]);

  const [image, setImage] = useState("");

  const changeHandlerSteps = (event, index) => {
    const { name, value } = event.target;
    const updatedSteps = [...formModify.steps];
    updatedSteps[index] = { ...updatedSteps[index], [name]: value };
    setFormModify({ ...formModify, steps: updatedSteps });
  };

  const removeStep = (event, index) => {
    event.preventDefault();
    const updatedSteps = formModify.steps.filter((step, i) => i !== index);
    // update the number property of each remaining step
    updatedSteps.forEach((step, i) => {
      step.number = i + 1;
    });
    setFormModify({ ...formModify, steps: updatedSteps });
  };

  const addStep = () => {
    const updatedSteps = [...formModify.steps];
    updatedSteps.push({ number: updatedSteps.length + 1, step: "" });
    setFormModify({ ...formModify, steps: updatedSteps });
  };

  //---------- Render  ----------//
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
      <div className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.h4}>Select Recipe</h1>
          <div className={styles.container}>
            <div className={styles.box}>
              <label className={styles.label}>Name: </label>
              <select
                className={styles.input}
                placeholder="Choose a recipe to Modify..."
                recipes="text"
                value={formModify.name}
                onChange={(event) => {
                  changeHandlerModify(event);
                  const selectedRecipe = recipes.find(
                    (recipe) => recipe.name === event.target.value
                  );
                  setId(selectedRecipe?.id || "");
                  setName(selectedRecipe?.name || "");
                  setSummary(selectedRecipe?.summary || "");
                  setScore(selectedRecipe?.score || "");
                  setSteps(selectedRecipe?.steps || []);
                  setDiets(selectedRecipe?.diets || []);
                  setImage(selectedRecipe?.image || "");
                }}
                name="name"
              >
                <option value="recipes"></option>
                {recipes &&
                  recipes
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((recipes) => {
                      return (
                        <option value={recipes.name} key={recipes.id}>
                          {recipes.name}
                        </option>
                      );
                    })}
              </select>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "2em",
                }}
              >
                {image && (
                  <img
                    className={styles.img}
                    src={image}
                    alt={formModify.name}
                  />
                )}
              </div>
            </div>
            <div className={styles.box}>
              <div>
                <div className={styles.forml}>
                  <div>
                    <label className={styles.label}>id: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={id}
                      name="id"
                      disabled // added disabled attribute
                    />

                    <div>
                      <label className={styles.label}>Summary: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={summary}
                        name="summary"
                        disabled // added disabled attribute
                      />
                    </div>
                    <div>
                      <label className={styles.label}>Score: </label>
                      <input
                        className={styles.input3}
                        type="text"
                        value={score}
                        name="score"
                        disabled // added disabled attribute
                      />
                    </div>

                    <div>
                      <label className={styles.label4}>Steps: </label>
                      {steps.map((step) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                          key={step.number}
                        >
                          <div className={styles.btnPrimary5}>
                            Number: {step.number}
                          </div>

                          <p className={styles.label6}> {step.step}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div>
                        <label className={styles.label}>Diets: </label>
                        <input
                          className={styles.input3}
                          type="text"
                          value={diets.join(", ")}
                          name="diets"
                          disabled // added disabled attribute
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <h1 className={styles.h4}>Modify Recipe</h1>
          <form onSubmit={submitHandlerModify}>
            <div>
              <label className={styles.label}>Name: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.name}
                onChange={changeHandlerModify}
                name="name"
                disabled
              ></input>
            </div>

            <div>
              <label className={styles.label}>Summary: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.summary}
                onChange={changeHandlerModify}
                name="summary"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Score: </label>
              <input
                className={styles.input}
                type="number"
                value={formModify.score}
                onChange={changeHandlerModify}
                name="score"
                placeholder="Choose score"
                style={{ color: "gray" }}
              />
            </div>
            {/*    <div className="step">
              <label className={styles.label4}>Steps: </label>
              {formModify.steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <br />
                  <textarea
                    className={styles.input5}
                    value={step.step}
                    onChange={(e) => changeHandlerModify(e, index)}
                    name="step"
                    data-index={index}
                  />
                  <button
                    className={styles.btnPrimary4}
                    onClick={(event) => removeStep(event, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  onClick={addStep}
                  className={styles.btnPrimary3}
                >
                  + Add
                </button>
              </div>
            </div> */}

            <div class="step">
              <label className={styles.label4}>Steps: </label>
              {formModify.steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <br />
                  <textarea
                    className={styles.input5}
                    value={step.step}
                    onChange={(e) => changeHandlerSteps(e, index)}
                    name="step"
                    data-index={index}
                  />
                  <button
                    className={styles.btnPrimary4}
                    onClick={(event) => removeStep(event, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  onClick={addStep}
                  className={styles.btnPrimary3}
                >
                  + Add
                </button>
              </div>
            </div>

            {/* <div>
              <label className={styles.label}>Image: </label>
              <select
                className={styles.input}
                value={formModify.image}
                onChange={changeHandlerModify}
                name="image"
              >
                <option value="" disabled>
                  Choose image
                </option>

                <option value="	https://spoonacular.com/recipeImages/716381-312x231.jpg">
                  img 1
                </option>
                <option value="https://spoonacular.com/recipeImages/794349-312x231.jpg">
                  img 2
                </option>
              </select>
            </div> */}
            <div>
              <label className={styles.label}>Image: </label>
              <select
                className={styles.input}
                value={formModify.image}
                onChange={changeHandlerModify}
                name="image"
              >
                <option value="" disabled>
                  Choose image
                </option>
                <option value="https://spoonacular.com/recipeImages/716381-312x231.jpg">
                  img 1
                </option>
                <option value="https://spoonacular.com/recipeImages/794349-312x231.jpg">
                  img 2
                </option>
              </select>

              <div>
                {formModify.image && (
                  <img
                    src={formModify.image}
                    alt="Preview"
                    className={styles.img}
                  />
                )}
              </div>
            </div>

            <div>
              <label className={styles.label}>Diets: </label>
              <select
                className={styles.input}
                placeholder="Choose a diet"
                type="text"
                onChange={changeHandlerDiet}
                name="diet"
              >
                <option value="" disabled selected>
                  Choose diet
                </option>
                <option value=""></option>
                {recipeDiets &&
                  recipeDiets
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

              <div>
                {formModify.diets.map((diets, index) => (
                  <div key={index}>
                    <span>{diets}</span>
                    <button
                      className={styles.btnPrimary3}
                      onClick={(event) => removeDiet(event, index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.Submmit} type="submit">
              Modify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modify;
