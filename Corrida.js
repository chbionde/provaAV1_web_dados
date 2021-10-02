export class Corrida {
    constructor (pilotos){
        this.participantes    = pilotos,
        this.podio            = []
    }

    testeLargada () {
        let teste = false;
        for (let corredores = 0; corredores < this.participantes.length; corredores++) {
            if (this.participantes[corredores].nome                     == ''){
                console.error('Piloto sem nome');                                                                    
                teste = false;
            }else 
            if (this.participantes[corredores].anosPilotando            == ''){
                console.error(this.participantes[corredores].nome,' tem que ter pelo menos um ano de experiencia');                                
                teste = false;
            }else 
            if (this.participantes[corredores].treinosMes               == ''){
                console.error('Não foi definido o tempo de treino do piloto'+ this.participantes[corredores].treinosMes);                                       
                teste = false;
            }else 
            if (this.participantes[corredores].veiculo[0].tipo          == ''){
                console.error('VEICULO: Necessario definir o tipo de veiculo (vai que é um racha de busão!!!!)');    
                teste = false;
            }else 
            if (this.participantes[corredores].veiculo[0].modelo        == ''){
                console.error('VEICULO: Necessario definir modelo');                                                 
                teste = false;
            }else 
            if (this.participantes[corredores].veiculo[0].ano           == ''){
                console.error('VEICULO: Necessario definir ano');                                                    
                teste = false;
            }else 
            if (this.participantes[corredores].veiculo[0].cor           == ''){
                console.error('VEICULO: Necessario definir cor');                                                    
                teste = false;
            }else 
            if (this.participantes[corredores].veiculo[0].potenciaMotor == ''){
                console.error('VEICULO: Necessario definir potencia do motor');                                      
                teste = false;
            }else {
                teste = true;
            }
        }
        return teste;
    }


    largada () {
        if (this.testeLargada()) {
            console.log('Se tudo esta OK, vamos começar !!!!!');
            for (let i = 0; i < 3; i++) {
                switch (i) {
                    case 0:  console.log('°   - UM   ');   break;
                    case 1:  console.log('°°  - DOIS ');   break;
                    case 2:  console.log('°°° - TRES ');   break;
                    default:                               break;
                }
            }
            console.log('COMEÇAR CORRIDA: RUN BABY RUN !!!!!')
            return true;
        } else {
            console.log('Deu ruim, voooooolta e faz direito !!!!!');
            return false;
        }

    }

    geraPodio (piloto,veiculo,tempo,diffTime) {
        
        this.podio.push({id: piloto, carro: veiculo, time: tempo, diff: diffTime});
        // console.log('PODIO ==>', this.podio);
        
        return this.podio;
    }
}