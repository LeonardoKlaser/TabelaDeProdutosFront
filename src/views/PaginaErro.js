
import Header from './shared/Header';
import Body from './Body';
import React, {Component} from 'react';

import Button from '@mui/material/Button';


class PaginaErro extends Component{

  render(){
    return (
      <div>
        <Header> </Header>
        <main className='bd-masthead' id='content' role='main'>
          <div className='conteiner'>
            <div className='row'>
              <div className='col-6 max-auto col-md-4 order-md-2'></div>
              <div className='col-md-8 order-md-1 text-center text-md-left pr-md-5'>
                <h1 className='mb-3'>Ops..... Pagina não encontrada </h1>
                <center>
                  <Button variant="contained" color="secondary" style={{margin:"5px"}} href='/Home'>Pagina Inicial</Button>
                
                </center>
                
              </div>
            </div>
          </div>
        </main>

      </div>
      
    )
      
    
  }
}

export default PaginaErro;
