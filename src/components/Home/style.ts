import styled from "styled-components";

export const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

export const TitleHome = styled.h2`
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  width: 500px;
  height: 500px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.75);
  border-radius: 16px;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 360px) {
    width: 200px;
    height: 200px;
  }

  picture {
    img {
      width: 100%;
      height: auto;
    }
  }
`;

export const Button = styled.button`
  background-image: linear-gradient(
    to right,
    #f857a6 0%,
    #ff5858 51%,
    #f857a6 100%
  );
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  font-size: 18px;
  font-weight: 700;
  border: none;

  &:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
    color: wheat;
  }
`;
