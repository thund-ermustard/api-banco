const {contas} = require('../bancodedados')
const accountBalance = (req, res) => {
const {numero_conta, senha} = req.query

if (!numero_conta || !senha){
    res.status(400).json({mensagem: 'senha ou conta incorretas'})
}
const actualAccountBalance = contas.find(conta => {
    return conta.numero === numero_conta
})
if (!actualAccountBalance){
    return res.status(404).json({mensagem: ' Conta não encontrada'})
}
if (actualAccountBalance.usuario.senha !== senha){
    return res.status(400).json({mensagem: 'Senha inválida'})
}
return res.json({saldo: actualAccountBalance.saldo})
}
module.exports = accountBalance