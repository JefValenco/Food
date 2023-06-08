// Este componente debe tomar un array de recetas y por cada receta renderizar un componente card
import Card from "../Card/Card";
import styles from "../CardsContainer/CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainer = ({ currentRecipes }) => {
  return (
    <div className={styles.container}>
      {currentRecipes.map((recipe) => {
        return (
          <div key={recipe.id}>
            <Link to={`${recipe.id}`} key={recipe.id}>
              <Card
                name={recipe.name}
                diets={recipe.diets}
                image={recipe.image}
                key={recipe.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
