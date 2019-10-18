//importações de componentes do sistema
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Button, Text, Item, Label, Input } from 'native-base';

export default class App extends Component {
//construtor dos stados de variaveis
  constructor(props) {
    super(props);
    this.state = { 
      priceGas: null, 
      priceAlc: null, 
      percent: null, 
      result: 'Aguardando Valores' }
      
    this.calculaClick = this.calculaClick.bind(this);
  }

  //função que valida os campos e calcula a melhor escolha de abastecimento
  calculaClick(event) {
    //valida se os campos nao estão nullos ou em branco
    if ((this.state.priceAlc && this.state.priceGas) != null && (this.state.priceAlc && this.state.priceGas) != '' ) {
      //calcula o resultado dependendo do calculo
      if (this.state.priceAlc / this.state.priceGas < 0.7) {
        //seta as variaveis com alcool e a porcentagem
        this.setState({ result: 'ALCOOL', percent: (this.state.priceAlc / this.state.priceGas * 100).toFixed(1) });
      } else
        //seta as variaveis com gasolina e a porcentagem
        this.setState({ result: 'GASOLINA', percent: (this.state.priceAlc / this.state.priceGas * 100).toFixed(1) });

    } else
     //seta as variaveis caso nao passem na validação
      this.setState({ result: 'INSIRA OS DADOS CORRETAMENTE', percent: null });
  }

  render() {
    return (
      <Container>
        <View style={styles.body}>
          <Text style={styles.textInfo}>SAIBA A MELHOR OPÇÃO PARA ABASTECER O SEU CARRO</Text>

          <Image source={require('./icone.png')} style={{ height: 250, width: 250, alignSelf: 'center' }} />

          <View style={styles.box}>

            <Item floatingLabel style={styles.boxInput}>
              <Label>R$: Alcool</Label>
              <Input
                maxLength={4}
                onChangeText={(priceAlc) => this.setState({ priceAlc })}
                keyboardType='number-pad' />
            </Item>

            <Text style={styles.textInfo}>  X  </Text>

            <Item floatingLabel style={styles.boxInput}>
              <Label>R$: Gasolina</Label>
              <Input
                maxLength={4}
                onChangeText={(priceGas) => this.setState({ priceGas })}
                keyboardType='number-pad' />
            </Item>

          </View>

          <Text style={styles.textInfo}>A MELHOR OPÇÃO É: </Text>
          <Text style={styles.textButton}>{this.state.result}</Text><Text style={styles.textButton}>{this.state.percent}%</Text>
          <Button style={styles.textButton} info onPress={this.calculaClick}><Text> Calcular </Text></Button>

        </View>
      </Container>
    )
  }
};

const styles = StyleSheet.create({

  body: {
    backgroundColor: '#B6D2AC',
    padding: 10,
    height: '100%'
  },
  textInfo: {
    color: '#2B3D4C',
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    fontWeight: "bold"
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'

  },
  boxInput: {
    color: 'white',
    width: '30%',

  },
  textButton: {
    alignSelf: "center",
    margin: 15
  },
  textResposta: {
    color: 'black',
    textAlign: 'center',
    fontSize: 40,
    margin: 20,
    fontWeight: "bold"
  },

});
