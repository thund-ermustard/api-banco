const {contas}= require('../bancodedados')
const crypto = require('crypto')
const accountsNewAccounts = (req, res)=>{
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
        if (!nome || !cpf || !data_nascimento|| !telefone || !email || !senha){
            return res.status(400).json({'mensagem': "todo os dados são obrigatórios"})
        }
        const findSameCpf = contas.find((conta) => cpf === conta.usuario.cpf)
        const findUniqueEmail = contas.find((conta) => email === conta.usuario.email)

        if (findSameCpf !== undefined || findUniqueEmail !== undefined ){
            return res.status(400).json({"mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})      
        }
        const numero = contas.length+1

        const newAccountCreated = {
            "numero": numero,
            "saldo": 0,
            "usuario":{
                "nome": nome,
                "cpf": cpf,
                "data_nascimento": data_nascimento,
                "telefone": telefone,
                "email": email,
                "senha": senha      
            }
  
        }
        contas.push(newAccountCreated)
        console.log(contas)
        return res.status(201).send()
}
module.exports = accountsNewAccounts

