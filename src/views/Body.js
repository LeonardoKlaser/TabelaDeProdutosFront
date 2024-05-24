import React, { Component } from 'react';
import { Button, Card, TextField, Box, Typography} from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

class Body extends Component {
  // Definição do estado inicial do componente
  state = {
    nomeProduto: '',
    paisDeOrigem: '',
    paisDeDestino: '',
    quantidade: '',
    valorUnitario: '',
    freteModo: '',
    importador: '',
    exportador: '',
    dataEmbarque: '', // Adicionando estado para data de embarque
    dataChegada: '', // Adicionando estado para data de chegada
    errors: {} // Objeto para armazenar mensagens de erro de validação
  };

  // Função para atualizar o estado quando um campo de formulário é alterado
  handleChange = (event) => {
    const { name, value } = event.target;
    // Atualiza o estado com o novo valor do campo
    this.setState({ [name]: value }, () => {
      // Verifica e valida campos que devem conter apenas letras
      if (['nomeProduto', 'paisDeOrigem', 'paisDeDestino', 'freteModo', 'importador', 'exportador'].includes(name)) {
        this.validateLetters(name, value);
      }
    });
  };

  // Função para validar se o valor do campo contém apenas letras e caracteres especiais permitidos
  validateLetters = (fieldName, value) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/; // Expressão regular para permitir apenas letras, espaços e caracteres acentuados comuns
    let errors = this.state.errors;

    // Verifica se o valor não corresponde ao regex
    if (!regex.test(value)) {
      errors[fieldName] = 'Apenas letras e caracteres especiais são permitidos neste campo';
    } else {
      delete errors[fieldName]; // Remove o erro se o valor for válido
    }

    this.setState({ errors }); // Atualiza o estado dos erros
  };

  // Função para validar todos os campos do formulário
  validateFields = () => {
    const { nomeProduto, paisDeOrigem, paisDeDestino, quantidade, valorUnitario, freteModo, importador, exportador } = this.state;
    let errors = {};
    let isValid = true;

    // Verificações de validação para cada campo
    if (!nomeProduto) {
      isValid = false;
      errors.nomeProduto = 'Nome do Produto é obrigatório';
    }
    if (!paisDeOrigem) {
      isValid = false;
      errors.paisDeOrigem = 'País de Origem é obrigatório';
    }
    if (!paisDeDestino) {
      isValid = false;
      errors.paisDeDestino = 'País de Destino é obrigatório';
    }
    if (!quantidade || isNaN(parseInt(quantidade, 10))) {
      isValid = false;
      errors.quantidade = 'Quantidade deve ser um número válido';
    }
    if (!valorUnitario || isNaN(parseFloat(valorUnitario))) {
      isValid = false;
      errors.valorUnitario = 'Valor Unitário deve ser um número válido';
    }
    if (!freteModo) {
      isValid = false;
      errors.freteModo = 'Modo de Frete é obrigatório';
    }
    if (!importador) {
      isValid = false;
      errors.importador = 'Importador é obrigatório';
    }
    if (!exportador) {
      isValid = false;
      errors.exportador = 'Exportador é obrigatório';
    }

    this.setState({ errors }); // Atualiza o estado dos erros
    return isValid; // Retorna true se todos os campos forem válidos
  };

  // Função para lidar com o envio do formulário
  handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!this.validateFields()) {
      return; // Se a validação falhar, não vai enviar o formulario
    }

    const { nomeProduto, paisDeOrigem, paisDeDestino, quantidade, valorUnitario, freteModo, importador, exportador, dataEmbarque, dataChegada } = this.state;
    const parsedQuantidade = parseInt(quantidade, 10); // Converte a quantidade para um número inteiro
    const parsedValorUnitario = parseFloat(valorUnitario); // Converte o valor unitário para um número de ponto flutuante

    try {
      // Envia os dados do formulário para a API
      await axios.post("https://localhost:7167/Api/produtos", {
        nomeProduto,
        paisDeOrigem,
        paisDeDestino,
        quantidade: parsedQuantidade,
        valorUnitario: parsedValorUnitario,
        freteModo,
        importador,
        exportador,
        dataEmbarque,
        dataChegada
      });
      // Reseta o estado do formulário após o envio
      this.setState({
        nomeProduto: '',
        paisDeOrigem: '',
        paisDeDestino: '',
        quantidade: '',
        valorUnitario: '',
        freteModo: '',
        importador: '',
        exportador: '',
        dataEmbarque: '',
        dataChegada: '',
        errors: {}
      });
      alert('Produto adicionado com sucesso!'); // Exibe uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao adicionar produto:', error); // Exibe um erro no console
      alert('Erro ao adicionar produto'); // Exibe uma mensagem de erro
    }
  };


  render() {
    const { nomeProduto, paisDeOrigem, paisDeDestino, quantidade, valorUnitario, freteModo, importador, exportador, dataEmbarque, dataChegada, errors } = this.state;

    return (
      <main style={{ padding: "50px" }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Adicionar Produto
          </Typography>
        </Box>

        <Card sx={{ padding: "30px", maxWidth: 600, margin: '0 auto' }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Nome do Produto"
              name="nomeProduto"
              value={nomeProduto}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.nomeProduto}
              helperText={errors.nomeProduto}
            />
            <TextField
              label="País de Origem"
              name="paisDeOrigem"
              value={paisDeOrigem}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.paisDeOrigem}
              helperText={errors.paisDeOrigem}
            />
            <TextField
              label="País de Destino"
              name="paisDeDestino"
              value={paisDeDestino}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.paisDeDestino}
              helperText={errors.paisDeDestino}
            />
            <TextField
              label="Quantidade"
              name="quantidade"
              value={quantidade}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.quantidade}
              helperText={errors.quantidade}
              type="number"
            />
            <TextField
              label="Valor Unitário"
              name="valorUnitario"
              value={valorUnitario}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.valorUnitario}
              helperText={errors.valorUnitario}
              type="number"
              step="0.01"
            />
            <TextField
              label="Modo de Frete"
              name="freteModo"
              value={freteModo}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.freteModo}
              helperText={errors.freteModo}
            />
            <TextField
              label="Importador"
              name="importador"
              value={importador}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.importador}
              helperText={errors.importador}
            />
            <TextField
              label="Exportador"
              name="exportador"
              value={exportador}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.exportador}
              helperText={errors.exportador}
            />
            <TextField
              label="Data de Embarque"
              name="dataEmbarque"
              value={dataEmbarque}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.dataEmbarque}
              helperText={errors.dataEmbarque}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Data de Chegada"
              name="dataChegada"
              value={dataChegada}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              error={!!errors.dataChegada}
              helperText={errors.dataChegada}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Adicionar
            </Button>
          </form>
        </Card>
      </main>
    );
  }
}

export default Body;
