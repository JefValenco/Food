import { useState } from "react";
import styles from "../Form/Form.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRecipeDiets } from "../../redux/actions";
import { getCreatedRecipes } from "../../redux/actions";
import { validate } from "../../middleware/validate";

const Form = () => {
  const dispatch = useDispatch();

  //----------States----------//

  const [form, setForm] = useState({
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

  const [formModify, setFormModify] = useState({
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

  const [formDelete, setFormDelete] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
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

  const resetForm = () => {
    setForm({
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

  const resetFormDelete = () => {
    setFormDelete({
      name: "",
    });
  };

  //----------Change Handlers----------//

  const removeDiet = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newDiet = [...formModify.diets];
    newDiet.splice(index, 1);
    setFormModify({ ...formModify, diets: newDiet });
  };

  const changeHandler = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value }, errors, setErrors);
    setForm({ ...form, [property]: value });
  };

  const changeHandlerSteps = (event, index) => {
    const { name, value } = event.target;
    const updatedSteps = [...form.steps];
    updatedSteps[index] = { ...updatedSteps[index], [name]: value };
    setForm({ ...form, steps: updatedSteps });
  };

  const changeHandlerDelete = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    setFormDelete({ ...formDelete, [property]: value });
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your recipe." },
    {
      field: "summary",
      message: "Please enter the summary points for your recipe.",
    },
    {
      field: "score",
      message: "Please enter the score points for your recipe.",
    },
    {
      field: "steps",
      message: "Please enter the steps points for your recipe.",
    },
    {
      field: "image",
      message: "Please enter the image points for your recipe.",
    },
    { field: "diets", message: "Please enter the diets of your recipe." },
  ];

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!form[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one diet is selected
    if (form.diets.length === 0 || form.diets.includes("")) {
      alert("Please select at least one diet for your Recipe.");
      return;
    }

    // Send form data to server
    axios
      .post("recipe", form)
      .then((res) => {
        alert("Recipe created!");
        resetForm();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const submitHandlerDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`recipe?name=${formDelete.name}`)
      .then((res) => {
        alert("Recipe deleted!");
        resetFormDelete();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const removeStep = (event, index) => {
    event.preventDefault();
    const updatedSteps = form.steps.filter((step, i) => i !== index);
    // update the number property of each remaining step
    updatedSteps.forEach((step, i) => {
      step.number = i + 1;
    });
    setForm({ ...form, steps: updatedSteps });
  };
  const addStep = () => {
    const updatedSteps = [...form.steps];
    updatedSteps.push({ number: updatedSteps.length + 1, step: "" });
    setForm({ ...form, steps: updatedSteps });
  };

  const diets = useSelector((state) => state.recipeDiets);

  useEffect(() => {
    dispatch(getRecipeDiets());
  }, []);

  const recipes = useSelector((state) => state.createRecipes);

  useEffect(() => {
    dispatch(getCreatedRecipes());
  }, []);

  /*   const changeDietHandler = (event) => {
    const { value, checked } = event.target;
    let newDiets = [...form.diets];
    if (checked) {
      newDiets.push(value);
    } else {
      newDiets = newDiets.filter((diet) => diet !== value);
    }
    setForm({ ...form, diets: newDiets });
  }; */

  const changeDietHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (!form.diets.includes(value)) {
      setForm({ ...form, [property]: [...form.diets, value] });
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.container}>
          <div className={styles.box}>
            {" "}
            {/*  <h1 className={styles.h4}>Create Recipe</h1> */}
            <form action="POST" onSubmit={submitHandler}>
              <div>
                <label className={styles.label}>Name: </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  className={styles.input}
                  name="name"
                ></input>
                {errors.name && <span>{errors.name}</span>}
              </div>
              <div>
                <label className={styles.label}>Summary: </label>
                <input
                  type="text"
                  value={form.summary}
                  onChange={changeHandler}
                  className={styles.input}
                  name="summary"
                  style={{ color: "gray" }}
                ></input>
              </div>

              <div>
                <label className={styles.label}>Score: </label>
                <input
                  className={styles.input}
                  type="number"
                  value={form.score}
                  onChange={changeHandler}
                  name="score"
                  placeholder="Choose score"
                  style={{ color: "gray" }}
                />
              </div>

              <div class="step">
                <label className={styles.label4}>Steps: </label>
                {form.steps.map((step, index) => (
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

              {/*      <div>
                <label className={styles.label}>Image: </label>
                <select
                  value={form.image}
                  onChange={changeHandler}
                  className={styles.input}
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
                  value={form.image}
                  onChange={changeHandler}
                  className={styles.input}
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

                <div>
                  {form.image && (
                    <img
                      src={form.image}
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
                  recipe="text"
                  onChange={changeDietHandler}
                  name="diets"
                  style={{ color: "gray" }}
                >
                  <option value="" disabled selected>
                    Choose diet
                  </option>
                  <option value=""></option>
                  {diets &&
                    diets
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((diets) => {
                        return (
                          <option value={diets.name} key={diets.id}>
                            {diets.name}
                          </option>
                        );
                      })}
                </select>

                <div>
                  {form.diets.map((diets, index) => (
                    <div key={index}>
                      <span className={styles.country}>{diets}</span>
                      <button
                        className={styles.Submmit2}
                        onClick={(event) => removeDiet(event, index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.Submmit} type="submmit">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
