const {contas}= require('../bancodedados')

const accountsAtualization = (req, res)=>{
    const {numeroConta}= req.params
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
        if (!nome || !cpf || !data_nascimento|| !telefone || !email || !senha){
            return res.status(400).json({'mensagem': "todo os dados são obrigatórios"})
        }
        const accountExistance = contas.findIndex((conta)=> conta.numero === numeroConta)
        
        if (accountExistance === -1){
            return res.status(400).json({'mensagem': "A conta não foi encontrada"})
        }
        const cpfExistance = contas.find((conta)=> conta.usuario.cpf === cpf)
        const emailExistance = contas.find((conta)=> conta.usuario.email === email)
       
        if(cpfExistance && cpfExistance.numero!==numeroConta ){
            return res.status(400).json({'mensagem': "CPF já faz parte de uma conta"})
        }
        if(emailExistance && emailExistance.numero!==numeroConta ){
            return res.status(400).json({'mensagem': "E-mail já faz parte de uma conta"})
        }
        const newAccountUpdate = {
            "numero": numeroConta,
            "saldo": contas[accountExistance].saldo,
            "usuario":{
                "nome": nome,
                "cpf": cpf,
                "data_nascimento": data_nascimento,
                "telefone": telefone,
                "email": email,
                "senha": senha      
            }
        }
        contas.splice(accountExistance , 1, newAccountUpdate)
        return res.status(204).send()
}       

module.exports = accountsAtualization 