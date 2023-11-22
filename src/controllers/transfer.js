const {contas, transferencias}= require('../bancodedados')

const transfer = (req, res)=>{

const {numero_conta_origem , numero_conta_destino, valor, senha} = req.body
if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(400).json({ mensagem: "Todos os dados são obrigatórios!" });
}
if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
}
const contaOrigem = contas.find((conta)=> conta.numero ===  numero_conta_origem)
const contaDestino = contas.find((conta)=> conta.numero ===  numero_conta_destino)
if (!contaOrigem){
    return res.status(400).json({ mensagem: "A conta de origem não foi encontrada!" });
}
if (!contaDestino){
    return res.status(400).json({ mensagem: "A conta de destino não foi encontrada!" });
}
if(contaOrigem.usuario.senha !== senha){
    return res.status(400).json({ mensagem: "Senha incorreta!" });
}
if(contaOrigem.saldo < valor){
    return res.status(400).json({ mensagem: "Saldo insuficiente!" }); 
}
contaOrigem.saldo -= valor 
contaDestino.saldo += valor

const novaTransferencia = {
    "data": new Date(),
    "numero_conta_origem": numero_conta_origem,
    "numero_conta_destino": numero_conta_destino,
    "valor": valor
}
transferencias.push(novaTransferencia)
console.log(transferencias)
res.status(204).send()


}
module.exports = transfer