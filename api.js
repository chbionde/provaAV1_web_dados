

let posicao = [];
let servidorOnline = true;
let fs = require('fs');


const chegada = (piloto) => {
  return new Promise((resolve, reject) => {
      if (!servidorOnline) reject('servidor Offline')
      posicao.push(piloto);
      resolve(posicao);
      
  })
}

const recorde = () => {
  return new Promise((resolve, reject) => {
    if (!servidorOnline) reject('servidor Offline')
    resolve(posicao[0]);
  })
}

const armazenarDadosCorrida = (dados) => {

  let obj = {};
  let json = '';

  if (fs.existsSync('./histCorridas.json')){
    obj = fs.readFileSync('./histCorridas.json', { encoding: 'utf8' });
  } else {
    obj = { corridas: [] };
  }

  try {
    obj = JSON.parse(obj);
  } catch(e) {
    obj = { corridas: [] };
  }

  obj.corridas.push(dados);
  json = JSON.stringify(obj); 
  
  fs.writeFile("./histCorridas.json", json, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("The histCorridas was saved!");
    }
  });
    
  fs.closeSync(0);
}


const amarzenaRecord = (dados) => {
    let obj = {};
    if (fs.existsSync('./recordCorridas.json')){
      obj = fs.readFileSync('./recordCorridas.json', { encoding: 'utf8' });
    } else {
      obj = { recordes: [] };
    }

    try {
      obj = JSON.parse(obj);
    } catch(e) {
      obj = { recordes: [] };
    }
    
    dados.forEach((v) => {
      if(obj.recordes.lenght === 0) {

        obj.recordes.push({id: v.id,  time: v.time});
      
      } else if (!obj.recordes.some(k => k.id == v.id)){
        
        obj.recordes.push({id: v.id,  time: v.time});
      
      } else if (obj.recordes.some(k => k.id === v.id)) {
        
        obj.recordes = obj.recordes.map(k => {

          if(k.id == v.id) {
            k.time = (v.time < k.time) ? v.time : k.time;
          }
          
          return k;
        
        })
      }
    })

    fs.writeFile("./recordCorridas.json", JSON.stringify(obj), (err) => {
      if(err) {
          console.log(err);
      } else {
          console.log("The recordCorridas was saved!");
      }
    });
}

const getHistCorridas = () => {

  let obj = {};

  if (fs.existsSync('./histCorridas.json')){
    obj = fs.readFileSync('./histCorridas.json', { encoding: 'utf8' });
  } else {
    console.error('Arquivo não existente !!!');
  }
  try {
    obj = JSON.parse(obj);
  } catch(e) {
    console.error('Arquivo vazio !!!');
  }

  return obj;
}

const getRecordCorridas = () => {

  let obj = [];

  if (fs.existsSync('./recordCorridas.json')){
    obj = fs.readFileSync('./recordCorridas.json', { encoding: 'utf8' });
  } else {
    console.error('Arquivo não existente !!!');
  }
  try {
    obj = JSON.parse(obj);
  } catch(e) {
    console.error('Arquivo vazio !!!');
  }

  return obj;
}

export default {
  'api/v1/chegada':                 chegada,
  'api/v1/recorde':                 recorde,
  'api/v1/armazenarDadosCorrida':   armazenarDadosCorrida,
  'api/v1/amarzenaRecord':          amarzenaRecord,
  'api/v1/getHistCorridas':         getHistCorridas,
  'api/v1/getRecordCorridas':       getRecordCorridas,
}