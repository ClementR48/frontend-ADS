import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Categories.scss";

const Categories = () => {
  const [activeCateg, setActiveCateg] = useState(-1);

  const dispatch = useDispatch();

  const productToDisplay = (categ) => {
    dispatch({
      type: "PRODUCTSTOSHOW",
      payload: categ
    })
  }

  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));

  // recuperation des catégories
  const allCategoriesWithDouble = products.map((product) => product.category);

  // eviter doublons des categories
  const categories = allCategoriesWithDouble.filter(
    (ele, pos) => allCategoriesWithDouble.indexOf(ele) === pos
  );

  useEffect(() => {
    productToDisplay('tout')
  }, [])

  return (
    <div className="categories">
      <ul className="list-categ">
        {categories.map((categorie, index) => (
          <li
            key={index}
            className={index === activeCateg ? "categ selected" : "categ"}
            onClick={() => {
              setActiveCateg(index);
              productToDisplay(categorie)
            }}
          >
            {categorie}
          </li>
        ))}

        <li className={activeCateg === -1 ? "categ selected" : "categ"} onClick={() => {
          setActiveCateg(-1)
          productToDisplay('tout')
        }}>Tout</li>
      </ul>
    </div>
  );
};

export default Categories;
