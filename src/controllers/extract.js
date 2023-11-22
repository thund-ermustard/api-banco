const {contas , depositos, saques, transferencias} = require('../bancodedados')
const extract = (req, res) => {
const {numero_conta, senha} = req.query

if (!numero_conta || !senha){
    res.status(400).json({mensagem: 'senha ou conta incorretas'})
}
const bankStatement = contas.find(conta => {
    return conta.numero === numero_conta
})
if (!bankStatement){
    return res.status(404).json({mensagem: ' Conta não encontrada'})
}
if (bankStatement.usuario.senha !== senha){
    return res.status(400).json({mensagem: 'Senha inválida'})
}
const accountDeposits = []
const accountWithdrawal = []
const accountTransfersOrigin = []
const accountTransfersDestine = []
depositos.forEach((conta)=>{
    if(conta.numero_conta === numero_conta){
        accountDeposits.push(conta)
    }
})
saques.forEach((conta)=>{
    if(conta.numero_conta === numero_conta){
        accountWithdrawal.push(conta)
    }
})
transferencias.forEach((conta)=>{
    if(conta.numero_conta_origem === numero_conta){
        accountTransfersOrigin.push(conta)
    }
    if(conta.numero_conta_destino === numero_conta){
        accountTransfersDestine.push(conta)
    }
})


return res.json({
    depositos : accountDeposits,
    saques : accountWithdrawal,
    transferenciasEnviadas : accountTransfersOrigin,
    transferenciasRecebidas : accountTransfersDestine
})
}
module.exports = extract