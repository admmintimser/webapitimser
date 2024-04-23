import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <img className="logop" src={'https://preventix.global/wp-content/uploads/2021/05/Logo-Preventix-300x145.png'} alt="Preventix" />
        <div className="banner">
          <img src={'https://preventix.global/wp-content/uploads/2023/03/NvaMesaTrabajo-1536x1207.png'} alt="nosotros" />
        </div>
        <div className="banner">
          <p>Preventix</p>
          <h3>¿Quienés somos?</h3>
          <p>
          Somos un laboratorio mexicano especializado
          en la Mujer, que nos dedicamos a la
          introducción de nuevas tecnologías para
          impulsar la Igualdad de género y cerrar la
          brecha de la desigualdad.
          </p>
          <p>Con Preventix salvamos vidas</p>
          <p> ¿Sabías que los biomarcadores son parte de las herramientas utilizadas en la medicina de precisión?</p>
          <p>
              Preventix llega a más mujeres al ser una prueba menos invasiva donde se debe extraer un tubo más de sangre durante tu check up rutinario
          </p>
          
        </div>
      </div>
    </>
  );
};

export default Biography;
