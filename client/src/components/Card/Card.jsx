// Este componente debe mostar la info de cada usuario mapeado, pero ademas debe mostrarel link para ir al detalle de la receta en cuesti´n.
import styles from "./Card.module.css";

const Card = (props) => {
  /*   const summarySentences = props.summary.split(". ");
  const summaryParagraphs = summarySentences.map((sentence) => (
    <p>
      {sentence + "."}
      <br />
    </p>
  )); */

  return (
    <div className={styles.container2}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src={props.image}
          alt="img"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <h2 className={styles.h2}>{props.name}</h2>
      <div className={styles.divider}></div>
      <p className={styles.p}>Diets: {props.diets.join(", ")}</p>
    </div>
  );
};

export default Card;
