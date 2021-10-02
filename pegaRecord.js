import api from './api'      ;

const teste = api['api/v1/getRecordCorridas']();

console.log('Todos os recordes são: \n');

for (let i = 0; i < teste.recordes.length; i++) {

    console.log('Piloto: ' + teste.recordes[i].id + ' | Recorde: ' + teste.recordes[i].time);    
    
}