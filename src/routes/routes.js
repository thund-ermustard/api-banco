const express = require('express')
const accountList = require('../controllers/accountsList')
const accountsNewAccounts = require('../controllers/accountsNewAccounts')
const accountsAtualization = require('../controllers/accountsAtualization')
const accountDelete = require('../controllers/accountDelete')
const accountBalance = require('../controllers/accountBalance')
const bankDeposit = require('../controllers/bankDeposit')
const withdrawal = require('../controllers/withdrawal')
const transfer = require('../controllers/transfer')
const extract = require('../controllers/extract')


const route = express()

route.get('/contas', accountList)
route.post('/contas', accountsNewAccounts)
route.put('/contas/:numeroConta/usuario', accountsAtualization)
route.delete('/contas/:numeroConta', accountDelete )
route.get('/contas/saldo',accountBalance)
route.get('/contas/extrato', extract)
route.post('/transacoes/depositar', bankDeposit)
route.post('/transacoes/sacar', withdrawal)
route.post('/transacoes/transferir', transfer)

module.exports = route;

