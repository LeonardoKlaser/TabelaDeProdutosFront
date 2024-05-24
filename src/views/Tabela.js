import React, { Component } from 'react';
import Header from './shared/Header';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomDeleteButton from './shared/CustomDeleteButonn'; // Make sure to import your custom delete button component
import EditoComponentButton from'./shared/EditoComponentButton';

class Tabelas extends Component {
  constructor(props) {
    super(props);
  
    // Definição do estado inicial do componente
    this.state = {
      columnDefs: [
        // Definição das colunas da tabela
        { headerName: "ID", field: "id" },
        { headerName: "Produto", field: "nomeProduto" },
        { headerName: "Origem", field: "paisDeOrigem" },
        { headerName: "Destino", field: "paisDeDestino" },
        { headerName: "Quantidade", field: "quantidade" },
        { headerName: "Valor Unitário", field: "valorUnitario" },
        { headerName: "Importador", field: "importador" },
        { headerName: "DataEmbarque", field: "dataEmbarque" },
        { headerName: "DataChegada", field: "dataChegada" },
        { headerName: "Exportador", field: "exportador" },
        { headerName: "ModoFrete", field: "freteModo" },
        {
          
          headerName: "Ações",
          cellRenderer: CustomDeleteButton, // Componente de botão customizado para exclusão
          cellRendererParams: { handleDelete: this.handleDelete } // Parâmetros para o componente de botão
        },
        {
          
          headerName: "Ações",
          cellRenderer: EditoComponentButton, // Componente de botão customizado para edição
          cellRendererParams: { handleEdit: this.handleEdit } // Parâmetros para o componente de botão
        },
      ],
      rowData: [] // Dados da tabela
    };
  }
  
  // Método executado após o componente ser montado
  componentDidMount() {
    this.getProdutos();
  }
  
  
  async getProdutos() {
    try {
      const response = await axios.get("https://localhost:7167/Api/produtos");
      const data = response.data;
      // Atualiza o estado com os dados obtidos da API
      this.setState({ rowData: data });
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  }
  handleDelete = async (id) => {
    try {
      
      await axios.delete(`https://localhost:7167/Api/produtos/${id}`);
      // Atualiza o estado removendo o produto da tabela
      this.setState(prevState => ({
        rowData: prevState.rowData.filter(produto => produto.id !== id)
      }));
    } catch (error) {
      console.error('Erro ao desativar produto:', error);
      alert('Erro ao desativar produto'); // Exibe uma mensagem de erro
    }
  };
  
  
  

  render() {
    return (
      <div>
        <Header />
        <main style={{ padding: "50px" }} className='bd-masthead' id='content' role='main'>
          <div style={{ marginBottom: "20px" }} className='conteiner'>
            <div className='row'>
              <div className='col-6 max-auto col-md-4 order-md-2'></div>
              <div className='col-md-8 order-md-1 text-center text-md-left pr-md-5'>
                <h1 style={{ textAlign: "initial" }} className='mb-3'>Tabela Produtos - {this.state.rowData.length}</h1>
              </div>
            </div>
          </div>

          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Tabelas;