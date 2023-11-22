const {contas, saques}= require('../bancodedados')

const withdrawal = (req, res)=>{

const {numero_conta , valor, senha} = req.body
if (!numero_conta || !valor || !senha) {
    return res.status(400).json({ mensagem: "Todos os dados são obrigatórios!" });
}
if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
}
const contaExiste = contas.find((conta)=> conta.numero ===  numero_conta)
if (!contaExiste){
    return res.status(400).json({ mensagem: "A conta não foi encontrada!" });
}
if (contaExiste.usuario.senha !== senha){
    return res.status(400).json({ mensagem: "A senha é inválida" });
}
if(contaExiste.saldo < valor){
    return res.status(400).json({ mensagem: "Saldo insuficiente" });
}
contaExiste.saldo -= valor
const newWithdrawal = {
        "data": new Date(),
        "numero_conta": numero_conta,
        "valor": valor
    }
    saques.push(newWithdrawal)
    console.log(saques)


res.status(204).send()


}
module.exports = withdrawal
