const bancodedados = require('../bancodedados')
const {contas}= require('../bancodedados')
const accountDelete = (req, res) => {
const {numeroConta}= req.params

const contaEncontrada = contas.find(conta => {
    return conta.numero === numeroConta
})
    if (!contaEncontrada){
        return res.status(404).json({mensagem: 'Conta não encontrada'})
    }

    if (contaEncontrada.saldo > 0){
        return res.status(403).json({mensagem: 'conta não pode ser apagada.'})

    }
    contas.filter(conta => {
        return conta.numero !== numeroConta

    })
    return res.status(204).send()
}

module.exports = accountDelete