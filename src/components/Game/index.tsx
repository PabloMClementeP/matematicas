import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Button,
  Container,
  Message,
  Problem,
  Score,
  TimeBar,
  ButtonGrid,
  HeartContainer,
  Heart,
  HeartGrey,
  GameOverMessage,
} from "./style"; // Asegúrate de tener los estilos correctos para los corazones
import Selection from "./components/selection";

import audioError from "/sounds/fail.mp3";
import audioCorrect from "/sounds/correct.mp3";
import { useUserContext } from "../../context/UserContext";

export type Operation = "suma" | "resta" | "multiplicacion" | "division";

interface Problem {
  question: string;
  answer: number;
}

const MathGame = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
    null
  );
  const [problem, setProblem] = useState<Problem>({ question: "", answer: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [lives, setLives] = useState<number>(5); // Vidas iniciales
  const intervalRef = useRef<number | null>(null);

  const { user, updateUser } = useUserContext(); 


  const errorSound = useRef(new Audio(audioError));
  const correctSound = useRef(new Audio(audioCorrect));

  const playErrorSound = () => errorSound.current.play();
  const playCorrectSound = () => correctSound.current.play();

  const generateProblem = useMemo(() => {
    return (operation: Operation): Problem => {
      let a: number, b: number, answer: number, question: string;
      switch (operation) {
        case "suma":
          a = Math.floor(Math.random() * 20) + 1;
          b = Math.floor(Math.random() * 20) + 1;
          answer = a + b;
          question = `${a} + ${b} = ?`;
          break;
        case "resta":
          a = Math.floor(Math.random() * 20) + 1;
          b = Math.floor(Math.random() * a) + 1;
          answer = a - b;
          question = `${a} - ${b} = ?`;
          break;
        case "multiplicacion":
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
          answer = a * b;
          question = `${a} × ${b} = ?`;
          break;
        case "division":
          b = Math.floor(Math.random() * 10) + 1;
          answer = Math.floor(Math.random() * 10) + 1;
          a = b * answer;
          question = `${a} ÷ ${b} = ?`;
          break;
        default:
          throw new Error("Operación no válida");
      }
      return { question, answer };
    };
  }, []);

  const generateOptions = (correctAnswer: number) => {
    const optionsSet = new Set([correctAnswer]);
    while (optionsSet.size < 6) {
      optionsSet.add(Math.floor(Math.random() * 40) + 1);
    }
    setOptions(Array.from(optionsSet).sort(() => Math.random() - 0.5));
  };

  const handleOperationSelect = useCallback((operation: Operation) => {
    setSelectedOperation(operation);
    setScore(0);
    setLives(5); // Reiniciar las vidas
    const newProblem = generateProblem(operation);
    setProblem(newProblem);
    generateOptions(newProblem.answer);
    resetTimer();
  }, []);

  const resetTimer = () => {
    setTimeLeft(10);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  };

  const handleAnswerSelect = useCallback(
    (selectedAnswer: number) => {
      if (selectedAnswer === problem.answer) {
        setScore((prevScore) => prevScore + 1);
        playCorrectSound();
        setMessage("¡Correcto! 🎉");
      } else {
        setMessage("Incorrecto. Intenta de nuevo.");
        playErrorSound();
        setLives((prevLives) => prevLives - 1); // Reducir una vida
      }

      if (selectedOperation) {
        const newProblem = generateProblem(selectedOperation);
        setProblem(newProblem);
        generateOptions(newProblem.answer);
        resetTimer();
      }
    },
    [problem.answer, selectedOperation]
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (timeLeft < 0 && selectedOperation) {
      setMessage("¡Tiempo acabado! 😞");
      const newProblem = generateProblem(selectedOperation);
      setProblem(newProblem);
      generateOptions(newProblem.answer);
      resetTimer();
    }
  }, [timeLeft, selectedOperation]);

  useEffect(() => {
    if (lives <= 0) {
      setMessage("¡Fin del juego! 😞");
      setSelectedOperation(null);
      updateUser( {...user, score} );
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [lives]);

  const hearts = useMemo(() => {
    return Array(5)
      .fill(null)
      .map((_, i) => (i < lives ? <Heart key={i} /> : <HeartGrey key={i} />));
  }, [lives]);

  return (
    <Container>
      {!selectedOperation ? (
        <Selection handleOperation={handleOperationSelect} />
      ) : (
        <div>
          {lives <= 0 ? (
            <GameOverMessage>
              Fin del juego. ¡Inténtalo de nuevo!
            </GameOverMessage>
          ) : (
            <div>
              <HeartContainer>{hearts}</HeartContainer>
              
              <Button onClick={() => setSelectedOperation(null)}>
                Cambiar operación
              </Button>
              <TimeBar timeLeft={timeLeft} />
              <Problem>{problem.question}</Problem>
              <ButtonGrid>
                {options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </Button>
                ))}
              </ButtonGrid>
              <Score>Puntuación: {score}</Score>
              {message && (
                <Message correct={message.includes("Correcto")}>
                  {message}
                </Message>
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default MathGame;
