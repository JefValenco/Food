import {
  GET_RECIPES,
  GET_RECIPE_DIETS,
  GET_CREATED_RECIPES,
  GET_MODIFY_RECIPES,
  GET_ITEM_BY_ID,
  GET_ITEM_BY_NAME,
  ORDER_BY_AZ,
  ORDER_BY_SCORE,
  CLEAR_SEARCH,
  FILTER_BY_DIET,
  FILTER_BY_CREATED,
} from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  recipeDiets: [],
  createRecipes: [],
  modifyItem: [],
  itemById: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_RECIPE_DIETS:
      return {
        ...state,
        recipeDiets: action.payload,
      };

    case GET_CREATED_RECIPES:
      return {
        ...state,
        createRecipes: action.payload,
      };
    case GET_MODIFY_RECIPES:
      return {
        ...state,
        modifyItem: action.payload,
      };

    case GET_ITEM_BY_ID:
      return {
        ...state,
        itemById: action.payload,
      };

    case GET_ITEM_BY_NAME:
      let search;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        search = action.payload;
      } else {
        search = [];
      }
      return {
        ...state,
        recipes: search,
      };

    case FILTER_BY_DIET:
      const allDiets = state.allRecipes;
      const filteredDiets =
        action.payload === "All"
          ? allDiets
          : allDiets.filter((el) => el.diets.includes(action.payload));

      return {
        ...state,
        recipes: filteredDiets,
      };
    case FILTER_BY_CREATED:
      const allCreated = state.allRecipes;
      const filteredCreated =
        action.payload === "All"
          ? allCreated
          : allCreated.filter((el) => el.create === action.payload);
      return {
        ...state,
        recipes: filteredCreated,
      };

    case ORDER_BY_AZ:
      const allAlphabet = state.allRecipes;
      let sortedArr;
      if (action.payload === "des") {
        sortedArr = state.recipes.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "asc") {
        sortedArr = state.recipes.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        });
      } else if (action.payload === "clear") {
        sortedArr = allAlphabet;
      }

      return { ...state, recipes: sortedArr };

    case ORDER_BY_SCORE:
      const allItems = state.allRecipes;
      let sortedItems;
      if (action.payload === "asc") {
        sortedItems = state.recipes.slice().sort(function (a, b) {
          return b.score - a.score;
        });
      } else if (action.payload === "des") {
        sortedItems = state.recipes.slice().sort(function (a, b) {
          return a.score - b.score;
        });
      } else if (action.payload === "clear") {
        sortedItems = allItems;
      }

      return { ...state, recipes: sortedItems };

    case CLEAR_SEARCH:
      return {
        ...state,
        allRecipes: state.initialCountries,
      };

    default:
      return state;
  }
};

export default rootReducer;
