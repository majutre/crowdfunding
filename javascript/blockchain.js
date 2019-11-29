var enderecoContrato = "0x0473B6E02b2F1A029D61e8E4c44D8f912F0E3de1";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);
var campoStatus = document.getElementById("campoStatus");

function finalizaCampanha() {
    contrato.finalizaCampanha()
        .then((resultado) => {
            campoStatus.innerHTML = resultado;
        })
        .catch((err) => {
            console.error(err);
            campoStatus.innerHTML = err.message;
        });
}

function getContractBalance() {
    var boxBalance = document.getElementById("boxBalance");
    console.log("getContractBalance - submitting the request");
    contrato.getContractBalance()
        .then((resultFromContract) => {
            console.log("getContractBalance - result is", resultFromContract);
            boxBalance.innerHTML = resultFromContract;
        })
        .catch((err) => {
            console.error(err);
            alert("A screen will be load asking to allow this page to connect with your Ethereum account.\nPlease give this permission to proceed.\nOr if you don't have an Ethereum account please install Metamask");
            ethereum.enable();
            alert("After you give the permission we are going to reload the page");
            document.location = "index.html";
        });
}

function Contribuir() {
    var amount = document.frmEntrar.valorContrib.value;
    if (amount < 0,01) {
        alert("You must pay a minimum of 0,01 ether to the Contract");
        return false;
    }
    var boxCommStatus = document.getElementById("boxCommStatus");
    boxCommStatus.innerHTML = "Sending transaction...";
    var additionalSettings = {
        value: ethers.utils.parseUnits(amount, 'ether')
    };
    contract.Contribuir(additionalSettings)
        .then((tx) => {
            console.log("executePayment - Transaction ", tx);
            boxCommStatus.innerHTML = "Transaction sent. Waiting for the result...";
            tx.wait()
                .then((resultFromContract) => {
                    console.log("executePayment - the result was ", resultFromContract);
                    getContractBalance();
                    boxCommStatus.innerHTML = "Transaction executed.";
                })
                .catch((err) => {
                    console.error("executePayment - after tx being mint");
                    console.error(err);
                    boxCommStatus.innerHTML = "Algo saiu errado: " + err.message;
                })
        })
        .catch((err) => {
            console.error("executePayment - tx has been sent");
            console.error(err);
            boxCommStatus.innerHTML = "Something went wrong: " + err.message;
        })
}


/*
function registrarMudancaStatus() {
    var textoCampo = document.frmStatus.txtStatusPagamentoAluguel.value;
    var caixaStatusTx = document.getElementById("caixaStatusTx");
    if (textoCampo.length === 8) {
        caixaStatusTx.innerHTML = "Enviando transação...";
        contrato.mudaStatusPagamento(textoCampo)
        .then( (transacao) => {
            console.log("registrarMudancaStatus - Transacao ", transacao);
            caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
            transacao.wait()
            .then( (resultado) => {
                buscaStatusContrato();
                caixaStatusTx.innerHTML = "Transação realizada.";
            })
            .catch( (err) => {
                console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        })
        .catch( (err) => {
            console.error("registrarMudancaStatus");
            console.error(err);
            caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
        })
    }
}

function buscaStatusContrato() {
    var status;
    var campoStatus = document.getElementById("campoStatus");
    contrato.statusPagamentoAluguel()
    .then( (resultado) => {
        campoStatus.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoStatus.innerHTML = err;
    });
}
*/
