let calcularDesconto = (valor) => {
   let percentualFolha = 19
   return {
     bruto:valor,
     desconto: valor*(percentualFolha/100),
     liquido: valor - (valor*(percentualFolha/100))
   }
}

let salario = (valorDiario,beneficios,cb) => {
  let total = valorDiario * 30 + beneficios
  return cb(total)
}

let pagamento = salario(100,322,calcularDesconto)
console.log(pagamento)

// let somar = (valores,resposta,cb) => {
//   total = 0;
//   valores.forEach(numero => {
//     total += numero
//   });
//   let acertou = resposta === total
//   if (cb){
//     cb(total,acertou,resposta)
//   } else{
//     return total
//   }
  
// }

// let visor = (resultado,acertou,resposta) => {
//   console.log(`sua tentativa ${resposta}`)
//   console.log(`o resultado é ${resultado}`)
//   if(acertou){
//     console.log('Parabéns!')
//   }else{
//     console.log('Não desanime!')
//   }
  
// }

// let valores = [1,2,3,4]
// console.log(somar(valores))
// somar(valores,11,visor)


let visor = ({total:resultado,acertou,resposta}) => {
  console.log(`sua tentativa ${resposta}`)
  console.log(`o resultado é ${resultado}`)
  if(acertou){
    console.log('Parabéns!')
  }else{
    console.log('Não desanime!')
  }
  
}


let somar = (valores,resposta) => {
  return new Promise((resolve,reject) => {
 
    total = 0;
    valores.forEach(numero => {
      total += numero
    });
    let acertou = resposta === total
    resolve({
      total,
      acertou,
      resposta
    })
  })
}

let valores = [1,2,3,4]
let resposta = 10
// somar(valores,resposta).then((response) => {
//   visor(response)
// }).catch((err) => {
//   console.log(err)
// })

// let iniciar = async () => {
//   try{
//     let response = await somar(valores,resposta)
//     visor(response)
//   }catch(err){
//     console.log(err)
//   }
  
// }

// iniciar()

import { get } from 'axios'

// axios
// .get('https://jsonplaceholder.typicode.com/todos')
// .then((response) => {
//   let todo = response.data[0]
//   axios
//   .get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`).
//   then((response) => {
//     console.log(`nome ${response.data.name}, email ${response.data.email}`)
//   })
// })

let premiarPrimeiroPost = async () => {
 let todos = await get('https://jsonplaceholder.typicode.com/todos')
 let user = await get(`https://jsonplaceholder.typicode.com/users/${todos.data[0].userId}`);
 console.log(`nome ${user.data.name}, email ${user.data.email}`)
}


premiarPrimeiroPost()


