/* 
    CRIAR NOSSA API DE USUÁRIOS

    - CRIAR UM USUÁRIO
    - LISTAR TODOS USUÁRIOS
    - EDITAR UM USUÁRIO
    - DELETAR UM USUÁRIO
*/

// FORMA ANTIGA está sendo descontinuada
// const express = require('express')

// FORMA ATUAL
// Importar biblioteca express apos ser instalada
// Para usarmos essa forma precisamos colocar "type": "module" (dentro do arquivo package.json)
import express from 'express' 

// Agora precisamos importar a biblioteca do PrismaClient
// já estamos criando com uma variavel prisma para manipulação da biblioteca
const { PrismaClient } = require('@prisma/client') // como colocamos o type module dentro do package, pode acontecer de dar erro com essa forma de importar
import { PrismaClient } from '@prisma/client'; // a forma correta seria com esse import
const prisma = new PrismaClient()

// variavel app pegando o express e passando como uma função
// Com isso entro do app tenho acesso a tudo que está atrelado ao express
const app = express()

//Para usar o formato json precisamos acionar ele dentro do express 
app.use(express.json())

// Objeto para guardar usuarios temporariamente
const users = []

// ROTA do tipo POST para criar um usuário, também preciso colocar um request(req) e response(res), pois preciso fazer uma requisição e enviar uma resposta.
app.post('/usuarios', async (req, res) => {
    // Os códigos das linhas abaixo são uma evolução para entendimento de do conceito que usaremos no POST
    console.log(req) // Aqui estamos usando uma console log para ver o que vem na requisição
    console.log(req.body) // A logica é a mesma da linha acima, porém trago apenas o body.
    users.push(req.body)// Como estamos criando e guardando dentro de um objeto precisamos colocar o req.body dentro do objeto users

    // Precisamos dar uma resposta informando que deu certo o acesso para aquela ROTA
    res.send('200 - Maravilha funcionou')

     // Promisse ou requisições assincronas, quando não sabemos quanto tempo vai demorar para aquela consulta, por isso colocamos o await, quando definido preciso avisar que a nossa função é async
     await prisma.clientes.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) // Nesse trecho indico que deu tudo certo e retorno em formato de json o usuario criado
})


// ROTA do tipo GET para listar ou mostrar, também preciso colocar um request(req) e response(res), pois preciso fazer uma requisição e enviar uma resposta.
app.get('/usuarios', async (req, res) => {
    
    
    res.send('200 - OK, deu certo!')// Precisamos dar uma resposta informando que deu certo o acesso para aquela ROTA
    res.status(200).json(users) // Nesse trecho informo que deu tudo certo e mostro a lista dos usarios que estão dentro do meu objeto

    const clientes = await prisma.clientes.findMany()// Nesse trecho estou criando um objeto chamado cliente e passando todos os usarios que eu tenho no meu banco atraves do método FindMany
    res.status(200).json(clientes) // E por fim mando um response com status 200, trazendo todos meus clientes em json
})

// Informando qual será a porta que irá rodar essa aplicação
// Para testarmos assim que startar o servidor é possivel acessar pelo browser a rota localhost:3000/usuarios
app.listen(3000)