import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px){
    width: 100px;
  }

  svg{
    width: 48px;
    height: 48px;
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin: 2rem auto;
`;

export const Problem = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

export const Score = styled.div`
  font-size: 2rem;
  margin-top: 2rem;
`;

export const Message = styled.div<{ correct: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  color: ${({ correct }) => (correct ? "green" : "red")};
`;

export const TimeBar = styled.div<{ timeLeft: number }>`
  width: 100%;
  height: 1.5rem;
  background-color: #e0e0e0;
  margin: 1rem 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ timeLeft }) => timeLeft * 10}%;
    background-color: ${({ timeLeft }) =>
      timeLeft > 5 ? "green" : timeLeft > 2 ? "orange" : "red"};
    transition: width 1s linear;
  }
`;


export const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const Heart = styled.div`
  width: 40px;
  height: 40px;
  background: red;
	clip-path: path("M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z");  
  margin: 0 5px;
  transform: scale(2);

`;

export const HeartGrey = styled(Heart)`
  background: grey;
`;

// Mensaje de fin del juego
export const GameOverMessage = styled.div`
  font-size: 24px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;