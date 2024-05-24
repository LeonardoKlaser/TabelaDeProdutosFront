import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const EditComponentButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nomeProduto: '',
    paisDeOrigem: '',
    paisDeDestino: '',
    quantidade: '',
    valorUnitario: '',
    freteModo: '',
    importador: '',
    exportador: '',
    dataEmbarque: '', // Adicionando estado para data de embarque
    dataChegada: '' // Adicionando estado para data de chegada
  });

  React.useEffect(() => {
    if (open) {
      setFormData({
        nomeProduto: props.data.nomeProduto,
        paisDeOrigem: props.data.paisDeOrigem,
        paisDeDestino: props.data.paisDeDestino,
        quantidade: props.data.quantidade,
        valorUnitario: props.data.valorUnitario,
        freteModo: props.data.freteModo,
        importador: props.data.importador,
        exportador: props.data.exportador,
        dataEmbarque: props.data.dataEmbarque, // Preenche os dados de embarque
        dataChegada: props.data.dataChegada // Preenche os dados de chegada
      });
    }
  }, [open, props.data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = async () => {
    try {
      await axios.put(`https://localhost:7167/Api/produtos/${props.data.id}`, formData);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Produto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome do Produto"
            name="nomeProduto"
            value={formData.nomeProduto}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="País de Origem"
            name="paisDeOrigem"
            value={formData.paisDeOrigem}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="País de Destino"
            name="paisDeDestino"
            value={formData.paisDeDestino}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantidade"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Valor Unitário"
            name="valorUnitario"
            value={formData.valorUnitario}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            step="0.01"
          />
          <TextField
            label="Modo de Frete"
            name="freteModo"
            value={formData.freteModo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Importador"
            name="importador"
            value={formData.importador}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Exportador"
            name="exportador"
            value={formData.exportador}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Data de Embarque"
            name="dataEmbarque"
            value={formData.dataEmbarque}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Data de Chegada"
            name="dataChegada"
            value={formData.dataChegada}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEdit} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditComponentButton;
