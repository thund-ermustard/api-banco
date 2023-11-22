const {contas, banco}= require('../bancodedados')
const accountList = (req , res)=> {
    

    const {senha_banco} = req.query

    if (!senha_banco) {
        return res.status(403).json({'mensagem': "senha não informada"})
    }
    if (senha_banco !== banco.senha) {
       return res.status(401).json({"mensagem": "A senha do banco informada é inválida!"})
    } 
    console.log(contas)

    return res.status(200).json(contas)

}

module.exports = accountList;

