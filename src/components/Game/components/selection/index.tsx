import { Operation } from '../..';
import { Button, ButtonGrid } from '../../style'
import { Divide, Minus, Plus, X } from 'lucide-react'

interface SelectionProps {
    handleOperation: (operation : Operation)=> void;
}

const Selection = ({handleOperation} : SelectionProps) => {
  return (
    <>
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