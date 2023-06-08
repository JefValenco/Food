import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <div className={style.links}>
        <Link to="/recipes" className={style.btnPrimary}>
          Recipes
        </Link>
        <button>Create Recipe</button>
        {/*   <Link to="/createrecipes" className={style.btnPrimary}>
          Create Recipe
        </Link> */}
        <Link to="/modify" className={style.btnPrimary}>
          Modify Recipe
        </Link>
        <Link to="/" className={style.btnPrimary}>
          Landing
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
