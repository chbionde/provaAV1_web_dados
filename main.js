/**
 * version:         1.0.0
 * data_criação:    2021-09-28
 */

//==============================================================================================================================

/**
 * area de importação
 */

import Veiculo    from './Veiculo'  ;
import api        from './api'      ;
import {Piloto}   from './Piloto'   ;
import {Corrida}  from './Corrida'  ;
//===============================================================================================================================

/**
 * monta os pilotos
 */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let nomespilotos = [
  'Arnaldo',
  'Pedro',
  'Gustavo',
  'Carlos',
  'Maria',
  'Sara',
  'Jorgim',
  'Rodrigo',
  'Joshua',
  'Igor',
  'André',
];

let pilotosCorrida = [];
nomespilotos.forEach(nome => {
  pilotosCorrida.push(new Piloto(nome,getRandomInt(1,40),getRandomInt(1,30)));
});

//===============================================================================================================================

/**
 * monta os veiculos
 */
let arrayCarros = [
  ['carro','corsa'      ,2000,'cinza',    450],
  ['carro','chevete'    ,1999,'vermelha', 120],
  ['carro','fusca'      ,1997,'vermelha', 480],
  ['carro','qualquer'   ,2000,'vermelha', 380],
  ['carro','qualquer1'  ,2000,'vermelha', 200],
  ['carro','qualquer2'  ,2000,'vermelha', 590],
  ['carro','qualquer3'  ,2000,'vermelha', 195],
  ['carro','qualquer4'  ,2000,'vermelha', 300],
  ['carro','qualquer5'  ,2000,'vermelha', 900],
  ['carro','brasilia'   ,2010,'vermelha', 210],
]

let carro;

pilotosCorrida.forEach(piloto => {
  carro = arrayCarros[getRandomInt(0,arrayCarros.length)]
  Object.assign(piloto,{"veiculo": [new Veiculo(carro[0],carro[1],carro[2],carro[3],carro[4])]});
});
//===============================================================================================================================

/**
 * monta a corrida
 */
let corrida   = new Corrida (pilotosCorrida);

 //===============================================================================================================================

/**
 * envia dados via api e salva num json
 */
let aux         = 0.00;
let counti      = 0;
let corridas;

let relatorio = (obj) => {
  api['api/v1/chegada'](obj.piloto).then((respostaDistancia) => {
    
    if (respostaDistancia.length == Veiculo.totalVeiculosCorrida){
      api['api/v1/recorde']().then((resposta) => {
        console.log(`O recorde é de ${resposta}`);
      }).catch(erro => console.log(erro))
      api['api/v1/armazenarDadosCorrida'](corridas);
      api['api/v1/amarzenaRecord'](corridas);
      console.log('\n\n\n\n\n\nPODIO DA CORRIDA:');
      console.log('---------------------------------------------------------------------------');
      for (let colocacao = 0; colocacao < corridas.length; colocacao++) {
        console.log((colocacao+1) + '° - ' + 'Piloto: ' + corridas[colocacao].id + ' | Tempo: ' + corridas[colocacao].time + ' | Diferença de tempo: ' + corridas[colocacao].diff + '\n---------------------------------------------------------------------------');
      }
    }
  }).catch(erro => console.log(erro));

  if (counti == 0) {
    corridas = corrida.geraPodio(obj.piloto,obj.modelo, obj.feedback, parseFloat(( aux ),2).toFixed(3));

  } else {
    corridas = corrida.geraPodio(obj.piloto,obj.modelo, obj.feedback, parseFloat(( obj.feedback - aux ),2).toFixed(3));

  }

  console.log(obj.piloto + ' com motor de ' + obj.potenciaMotor + 'cv demorou ' + obj.feedback + ' segundos de 0 a 100 km' );
  
  counti++;
  aux = obj.feedback;
}

//===============================================================================================================================

/**
 * inicia a corrida
 */

 if (corrida.largada()) {
  pilotosCorrida.forEach(piloto => {
    piloto.veiculo[0].acelerando0a100(piloto,relatorio);
  });
}
