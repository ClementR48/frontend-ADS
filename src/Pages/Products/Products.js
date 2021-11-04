import React, { useEffect } from "react";
import { getProducts } from "../../redux/reducer/productsReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, []);
  
  return (
    
    <ul>
      {products.map((product) => {
        return (
          
            
            <Link
              to={{
                pathname: `/produits/${product.name
                  .replace(/\s+/g, "")
                  .trim()}`,
              }}
              key={product.id}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iusto optio eligendi dolor, modi nesciunt. Error rerum corporis odio aliquid quaerat debitis quos iure illum veritatis explicabo! Perspiciatis consequuntur tempora eligendi est, tenetur soluta facere itaque beatae aut! Voluptate itaque modi hic, magni, amet ab quibusdam eum, provident libero nisi harum! Modi non exercitationem nesciunt incidunt fuga totam eius ea doloremque corrupti velit! Aperiam, explicabo sed. Minus unde quasi commodi. Iure ipsum consequatur totam ab esse recusandae illo nisi provident suscipit, ullam ratione temporibus consequuntur rem quo nostrum non. Assumenda accusamus et ab iure? Repellendus aperiam quisquam soluta reiciendis, maxime pariatur atque perspiciatis suscipit. Porro rerum vel cupiditate odio sunt dolores unde laborum dolorum nihil iure cumque ex consequuntur fugiat maiores molestias provident dicta aperiam doloremque quia enim, ipsa voluptate id facere earum. Dolores laudantium eius eligendi officiis repudiandae consequuntur tenetur dolorum nobis officia molestiae. Odit velit tempore dicta quisquam necessitatibus beatae, nobis veritatis quibusdam fuga eligendi inventore ratione expedita. Sed sit repellendus tempora sapiente modi atque tenetur quis nesciunt quae doloribus vero voluptatem nihil, dicta quibusdam ab quia ut mollitia! Officiis accusantium, molestias nulla voluptatibus saepe earum iure? Natus facilis officia non suscipit laborum quo doloremque distinctio pariatur dolor facere explicabo rem quidem, animi qui mollitia dolorem? Similique, totam quidem odit ipsa nostrum fugit quibusdam, consequuntur officiis voluptate incidunt sit ad porro eius earum officia, maiores provident odio ut. Possimus amet soluta cumque numquam? Repellendus, sapiente quaerat eveniet quis qui, excepturi impedit sed sunt aspernatur mollitia expedita voluptas accusamus pariatur reiciendis velit ipsa facilis odit iusto magnam eum deserunt, est placeat! Et tempora animi similique eum asperiores nostrum. Enim ut neque omnis quidem, dolor cupiditate exercitationem et debitis ea fugiat eos aliquam porro quae delectus veritatis at officiis doloribus sit. Porro aperiam soluta adipisci eveniet saepe dolores suscipit fugit.
            </Link>
          
        );
      })}
    </ul>
  );
};

export default Products;
