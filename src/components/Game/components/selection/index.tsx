import { Operation } from '../..';
import { useUserContext } from '../../../../context/UserContext';
import { Button, ButtonGrid } from '../../style'
import { Divide, Minus, Plus, X } from 'lucide-react'

interface SelectionProps {
    handleOperation: (operation : Operation)=> void;
}

const Selection = ({handleOperation} : SelectionProps) => {
  const { user } = useUserContext(); // Obtén directamente `user` y `logoutUser`

  return (
    <>
    <h2 style={{fontSize:'32px', color:'chocolate'}}>Mejor puntaje: {user?.topScore}</h2>
    <h1 style={{marginTop:'32px'}}>Selecciona la operación que vas a jugar</h1>
    <ButtonGrid>
      <Button onClick={() => handleOperation("suma")}>
        <Plus /> 
      </Button>
      <Button onClick={() => handleOperation("resta")}>
        <Minus /> 
      </Button>
      <Button onClick={() => handleOperation("multiplicacion")}>
        <X /> 
      </Button>
      <Button onClick={() => handleOperation("division")}>
        <Divide /> 
      </Button>
    </ButtonGrid>
  </>
  )
}

export default Selection