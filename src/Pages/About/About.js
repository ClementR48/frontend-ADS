import React, { useEffect, useState } from 'react';

const About = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    
    
      setTimeout(() => {
        setLoading(true)
      },200)
    
  }, [])
  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat placeat quasi rem quos ipsam repellat reiciendis, quam dolorum nihil expedita voluptate. Vel modi quasi quae mollitia at nobis repellat, eaque fugit consequuntur esse explicabo non nihil delectus recusandae iste dolores reprehenderit harum doloribus possimus, nesciunt voluptatem rem dignissimos velit laborum! Officia labore modi rerum rem beatae accusantium eos consectetur, quaerat quidem dignissimos et impedit delectus reprehenderit esse distinctio sit quis consequatur suscipit amet commodi eligendi iste illum! Aperiam quia laborum cumque architecto! Aliquid, sint. Accusantium odio sapiente veniam error distinctio laborum! Optio facilis illo veritatis harum mollitia maiores culpa dolor doloribus. Est ut sunt, pariatur exercitationem cumque perferendis optio voluptas beatae corrupti totam molestias modi et itaque distinctio incidunt magnam dignissimos similique debitis dolores nisi reprehenderit? Harum quas distinctio corporis dicta, hic optio fuga cumque assumenda dolore! Molestias corporis ipsum ex enim et consequatur modi in. Cum magni odit porro odio quis earum accusantium, quisquam, corporis sequi maiores enim necessitatibus nisi. Nisi autem dignissimos quod sed perferendis veritatis rem dicta aliquid porro magni voluptatibus inventore, aperiam quibusdam debitis? Minus inventore cumque cum delectus assumenda in, accusamus quaerat. Eum ut adipisci ipsum, accusamus repudiandae quam in cum! Deserunt, vel maiores. Totam unde eligendi corrupti sit cumque ullam at a deserunt sapiente nulla. Ea dolor quam quod perferendis quis facere labore corporis culpa velit harum pariatur sunt eligendi nostrum id, amet quae earum debitis dolores. Earum laboriosam repellendus culpa reprehenderit? Consequuntur, animi laborum iure nisi debitis nihil quis eaque molestiae maiores, eum accusantium, veritatis dolorem tenetur suscipit sequi obcaecati magnam hic aliquam quo perferendis deserunt! Eos repellat eligendi porro vero magni necessitatibus inventore fugit amet, aut numquam odio, alias soluta voluptates. Officiis, impedit vitae! Ipsam quas pariatur sed laboriosam cum vero amet numquam? Et, molestias? Eveniet sed natus deserunt maiores ex quasi sunt autem distinctio quaerat porro. Quisquam, modi quaerat consectetur voluptatibus fuga dicta eveniet. Tempora magni qui itaque ullam nihil suscipit sit aperiam veniam soluta ipsum doloremque tempore consequatur vel at quisquam, eum, vitae nulla sed exercitationem quia corporis? Incidunt repudiandae ducimus eius iste vitae et quas ipsam laboriosam voluptas voluptates? Harum, nulla nisi voluptates labore voluptatem officiis quidem debitis! Dolor consequatur quis aperiam nisi quibusdam, at ea itaque obcaecati excepturi tempore nihil blanditiis! Molestias, blanditiis eum distinctio iusto ea similique sapiente culpa ipsam unde dicta autem, sequi hic adipisci obcaecati aut corporis fugiat voluptate vel dolorem quos quasi quis? Dolor tempora magni quam, consequuntur vel amet eaque. Suscipit, natus rem quas expedita numquam illo animi excepturi. Eligendi, aliquam! Quaerat quis quod amet possimus sapiente, nihil numquam ducimus ad eius, neque repellat aliquam doloribus eaque officia iste dolorum atque consequuntur reiciendis. Vel itaque fugit deserunt cum dignissimos autem corporis nam magni beatae doloremque ipsam quod, eos sit error officiis optio eius enim inventore minus. Eaque corporis doloremque, consectetur recusandae dolorem quis mollitia voluptatibus. Dolores nostrum aliquam pariatur veniam culpa quos sunt. Sit mollitia tempore veniam minima sed aperiam accusantium. Dolore beatae quas cupiditate saepe nesciunt recusandae suscipit sint sed sunt tenetur.
      {loading && <p>Fin Loading</p>}
    </div>
  );
};

export default About;