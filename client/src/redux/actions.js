import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DIETS = "GET_RECIPE_DIETS";
export const GET_CREATED_RECIPES = "GET_CREATED_RECIPES";
export const GET_MODIFY_RECIPES = "GET_MODIFY_RECIPES";
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const GET_ITEM_BY_NAME = "GET_ITEM_BY_NAME";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";

export function getRecipes() {
  return async function (dispatch) {
    try {
      /* 
     *Pagiantion*
     const response = await axios.get(`/recipe?page=1&limit=10`); */
      const response = await axios.get(`/recipe`);
      /*     const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=d4b60f83f7244561a22f7e3122c2d00d&addRecipeInformation=true&number=100`
      ); */
      dispatch({ type: GET_RECIPES, payload: response.data });
    } catch (error) {
      console.log("Get getRecipes Actions Error:", error);
    }
  };
}

export function getRecipeDiets() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/diet`);
      dispatch({ type: GET_RECIPE_DIETS, payload: response.data });
    } catch (error) {
      console.log("Get getRecipeDiets Actions Error:", error);
    }
  };
}

export function getCreatedRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipe`);
      const createdRecipes = response.data.filter((recipe) => recipe.create);
      dispatch({ type: GET_CREATED_RECIPES, payload: createdRecipes });
    } catch (error) {
      console.log("Get getCreatedRecipes Actions Error:", error);
    }
  };
}

export function getModifyRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipe`);
      const createdRecipes = response.data.filter((recipe) => recipe.create);
      dispatch({ type: GET_MODIFY_RECIPES, payload: createdRecipes });
    } catch (error) {
      console.log("Get getCreatedRecipes Actions Error:", error);
    }
  };
}

export function getItemById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipe/${id}`);

      dispatch({ type: GET_ITEM_BY_ID, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ITEM_BY_ID, payload: null });
    }
  };
}

export function getItemByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/recipe?name=` + payload);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: "not found",
      });
    }
  };
}

export function FilterByDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}

export function FilterByCreated(payload) {
  if (payload === "All") {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload,
    };
  } else {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload === "true",
    };
  }
}

export function orderByAZ(payload) {
  return {
    type: "ORDER_BY_AZ",
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}

export function clearSearch() {
  return { type: CLEAR_SEARCH };
}
