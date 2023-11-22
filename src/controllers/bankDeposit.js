const {contas, depositos}= require('../bancodedados')

const bankDeposit = (req, res)=>{

const {numero_conta , valor} = req.body
if (!numero_conta || !valor) {
    return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
}
if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
}
const contaExiste = contas.find((conta)=> conta.numero ===  numero_conta)
if (!contaExiste){
    return res.status(400).json({ mensagem: "A conta não foi encontrada!" });
}
contaExiste.saldo += valor

const newDeposit = {
    "data": new Date(),
    "numero_conta": numero_conta,
    "valor": valor
}
depositos.push(newDeposit)
console.log(depositos)
res.status(204).send()



}
module.exports = bankDeposit