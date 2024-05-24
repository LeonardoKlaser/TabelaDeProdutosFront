import React from 'react';
import Button from '@mui/material/Button';

// Define um componente funcional chamado CustomDeleteButton
const CustomDeleteButton = (props) => {
  
  
  const handleDelete = () => {
    // Chama a função handleDelete passada através de props com o id do item a ser excluído
    props.handleDelete(props.data.id);
  };

  // Retorna o JSX para renderizar um botão
  return (
    
      <Button variant="outlined" onClick={handleDelete}>
        Excluir
      </Button>
  );
};


export default CustomDeleteButton;