import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Play } from "react-feather";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Categories.scss";

const Categories = () => {
  const [activeCateg, setActiveCateg] = useState(-1);

  const dispatch = useDispatch();

  const productToDisplay = (categ) => {
    dispatch({
      type: "PRODUCTSTOSHOW",
      payload: categ,
    });
  };

  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));

  // recuperation des catégories
  const allCategoriesWithDouble = products.map((product) => product.category);

  /* Eviter doublons */
  const categories = allCategoriesWithDouble.filter(
    (ele, index, self) =>
      index === self.findIndex((categ) => categ.name === ele.name)
  );


  useEffect(() => {
    productToDisplay("tout");
  }, []);

  return (
    <div className="categories">
      <ul className="list-categ">
        {categories.map((categorie, index) => (
          <li
            key={index}
            className={index === activeCateg ? "categ selected" : "categ"}
            onClick={() => {
              setActiveCateg(index);
              setTimeout(() => {
                productToDisplay(categorie.name);
              }, 100);
            }}
          >
            <p>{categorie.name}</p>
            <img src={categorie.logo} alt={`${categorie.name} logo`} />
          </li>
        ))}

        <li
          className={activeCateg === -1 ? "categ selected" : "categ"}
          onClick={() => {
            setActiveCateg(-1);
            setTimeout(() => {
              productToDisplay("tout");
            });
          }}
        >
          Tout
        </li>
      </ul>
    </div>
  );
};

export default Categories;
