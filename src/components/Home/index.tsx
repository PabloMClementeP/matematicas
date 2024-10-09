import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, HomeWrapper, ImageContainer, TitleHome } from "./style";
import { useUserContext } from "../../context/UserContext";

const MOBILE_IMAGE_PATH = '/math-monsters-mobile.webp';
const DESKTOP_IMAGE_PATH = '/math-monsters.webp';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/game');
  }, [navigate]);

  return (
    <HomeWrapper>
      <TitleHome>El juego de las matematicas</TitleHome>
      <Button onClick={handleClick}>
        { user && user.isLogued ? 'Jugar' : 'Ingresar'}
      </Button>
      <ImageContainer>
        <picture>
          <source media="(max-width:768px)" srcSet={MOBILE_IMAGE_PATH} />
          <img src={DESKTOP_IMAGE_PATH} alt="Math image" loading="lazy" />
        </picture>
      </ImageContainer>
    </HomeWrapper>
  );
};

export default React.memo(Home);
