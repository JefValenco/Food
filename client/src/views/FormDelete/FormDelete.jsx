import { useState } from "react";
import styles from "../FormDelete/FormDelete.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRecipeDiets } from "../../redux/actions";
import { getCreatedRecipes } from "../../redux/actions";
import { validate } from "../../middleware/validate";

const FormDelete = () => {
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
      .post("/recipe", form)
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
      .delete(`/recipe?name=${formDelete.name}`)
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
            <h1 className={styles.h4}>Delete Recipe</h1>
            <form onSubmit={submitHandlerDelete}>
              <div>
                <label className={styles.label}>Name: </label>
                <select
                  className={styles.input}
                  placeholder="Choose a name to delete..."
                  recipe="text"
                  value={formDelete.name}
                  onChange={changeHandlerDelete}
                  name="name" // changed from "recipes"
                >
                  <option value="recipe"></option>
                  {recipes &&
                    recipes
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((recipe) => {
                        return (
                          <option value={recipe.name} key={recipe.id}>
                            {recipe.name}
                          </option>
                        );
                      })}
                </select>
              </div>

              <button
                className={`${styles.Submmit} ${
                  form.name ? "" : styles.disabled
                }`}
                disabled={!formDelete.name}
                type="submit"
              >
                Confirm Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDelete;
