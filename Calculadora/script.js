const operacaoAnterior = document.getElementById("anterior");

const operacaoAtual =document.getElementById("atual");

const buttons = document.querySelectorAll("table tr td input");

class Calculator {
    constructor(operacaoAnterior, operacaoAtual ) {
        this.operacaoAnterior = operacaoAnterior
        this.operacaoAtual = operacaoAtual
        this.atual = ""
        
    };

//adicionando digitos ao visor 
    addDigit(digit){
//checando digitos 
        if(digit === "." && this.operacaoAtual.innerText.includes(".")){
            return;
        }
        
        this.atual = digit
        this.updateScreen()
    }

//processando operações

processOperation(operation){
    //checando operações
    if(this.operacaoAtual.innerText ==="" && operation != "C"){
        if(this.operacaoAnterior.innerText != ""){
//mudançã de operadores
            this.changeOperation(operation);
        }
        return;
    }

//pegando valores anteriores e atuais

    let operationValue
    const previous = +this.operacaoAnterior.innerText.split(" ")[0]
    const current = +this.operacaoAtual.innerText;

    switch(operation) {
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "-":
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "/":
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "x":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "DEL":
           this.apagando();
            break;
        case "CE":
           this.apagandoAtual();
            break;
        case "C":
           this.apagandoTudo();
            break;
        case "=":
           this.igual();
            break;
        default:
            return;
    }
};


    updateScreen(
        operationValue = null,
         operation = null,
          current = null,
          previous = null){

            console.log(operationValue, operation, current, previous);
            
            if(operationValue === null){
                this.operacaoAtual.innerText += this.atual;

            }else {
//verificando se o valor é nulo, se for  add o valor atual
                if (previous === 0){
                    operationValue = current
                }
                this.operacaoAnterior.innerText = `${operationValue} ${operation}`
                this.operacaoAtual.innerText = "";
                
                
            }
    };

//mudando operação

    changeOperation(operation){
        const mathOperations = ["x", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return;
        }
        this.operacaoAnterior.innerText = this.operacaoAnterior.innerText.slice(0, -1) + operation
    }

//apagando digitos
    apagando() {
        this.operacaoAtual.innerText = this.operacaoAtual.innerText.slice(0, -1);
    }
    apagandoAtual() {
        this.operacaoAtual.innerText = "";
    }
    apagandoTudo() {
        this.operacaoAtual.innerText = "";
        this.operacaoAnterior.innerText = "";
    }
//igualando operações
    igual() {

        
        const operation = operacaoAnterior.innerText.split(" ")[1].slice()

        

        this.processOperation(operation)

        this.operacaoAtual.innerText = operacaoAnterior.innerText.slice(0, -1)

        this.operacaoAnterior.innerText = ""
                
   

        
    }
};

const calc = new Calculator (operacaoAnterior, operacaoAtual);


//verificando click

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.value;

        if(+value >= 0 || value === "." ){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }
    })
})