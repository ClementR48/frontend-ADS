import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ImageHome.scss";

const ImageHome = () => {
  const text = "La céramique inspirée";
  const textSplit = text.split("");
  let elements = useRef([]);
  let image = useRef();

  useEffect(() => {
    let d = 0.05;
    let y = -100;

    for (let i = 0; i < 5; i++) {
      gsap.to(elements.current[i], {
        y: (y = y - 10),
        duration: 0.6,
        delay: 1.5 + d * i,
        opacity: 1,
        ease: "power4",
      });
    }
    for (let i = 5; i < 10; i++) {
      gsap.to(elements.current[i], {
        y: (y = y + 10),
        duration: 0.6,
        delay: 1.5 + d * i,
        opacity: 1,
        ease: "power4",
      });
    }
    for (let i = 10; i < 15; i++) {
      gsap.to(elements.current[i], {
        y: (y = y - 10),
        duration: 0.6,
        delay: 1.5 + d * i,
        opacity: 1,
        ease: "power4",
      });
    }
    for (let i = 15; i < 21; i++) {
      gsap.to(elements.current[i], {
        y: (y = y + 10),
        duration: 0.6,
        delay: 1.5 + d * i,
        opacity: 1,
        ease: "power4",
      });
    }

    
  }, []);

  return (
    <div className="image-home-container">
      <img
        src={
          process.env.PUBLIC_URL + "/assets/images/homeMainImage2Moyenne.jpg"
        }
        ref={image}
        alt="vases présentés"
      />
      <div className="text">
        {textSplit.map((letter, index) => {
          return (
            <li ref={(el) => (elements.current[index] = el)} key={index}>
              {letter}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default ImageHome;
