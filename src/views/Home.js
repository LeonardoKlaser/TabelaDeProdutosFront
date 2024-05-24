import React, { Component } from 'react';


import axios from 'axios';

import Header from './shared/Header'

import Grid from '@mui/material/Unstable_Grid2';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

class Home extends Component {
  

  render() {

    return (
      <div>
         
        <Header></Header>
        
        <Box Component = "span" m={12}></Box>
        
          <Grid container spacing={2}>
          
            <Grid xs={6}>
              <Container maxWidth="sm">

              <Typography variant="h3" component="h2">
                <center>Tabela de Gerenciamento <br></br> <center>de Produtos</center></center>
                
              </Typography>
              <Box Component = "span" m={5}></Box>
              <Typography variant="body1" component="h2">
                <center>Tabela de Gerenciamento de Produtos</center>
              </Typography>
              <Box Component = "span" m={5}></Box>
              
              <center>
                <Button variant="contained" color="secondary" style={{margin:"5px"}} href='/adicionar'>Adicionar Produto</Button>
                <Button variant="contained" color="secondary" href='/Tabela'>Visualizar tabela</Button>
              </center>
              
              </Container>
            </Grid>
            
            <Grid xs={6}>
              
            </Grid>
            
          </Grid>
        
          

       
        
      
      </div>
     
    );
  }
}

export default Home;