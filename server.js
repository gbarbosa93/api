/*
    CRIAR NOSSA API DE USUÁRIOS

    - CRIAR UM USUÁRIO
    - LISTAR TODOS USUÁRIOS
    - EDITAR UM USUÁRIO
    - DELETAR UM USUÁRIO

    BD
    user: gabrielnobrega
    pass: lnAEDbOcRsN88Rok
*/


import express from 'express'
import cors from 'cors' 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() // Variavel para manipulação do Prisma
const app = express() // variavel para manipulação do express
app.use(express.json()) // variavel para conversão em json
app.use(cors()) // Com esse comando é possivel eu front-end se conectar com meu servidor


app.post('/usuarios', async (req, res) => { // Criar novo usuário

    await prisma.clientes.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => { // Editar um usuário

    await prisma.clientes.update({ // atualização de usuarios
        where: { // Onde vou atualizar
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:email', async (req, res) => {
    await prisma.clientes.delete({ // Deletar usuario
        where: { // Onde vou deletar
            email: req.params.email
        }
    })
    res.status(200).json({message: 'Usuário deletado com sucesso'})

})

app.get('/usuarios', async (req, res) => { // Listar usuários

    let clientes = []

    if(req.query){
        clientes = await prisma.clientes.findMany({
            where: {
                id: req.query.id,
                email: req.query.email,
                name: req.query.name,
                age: req.query.age
            }
        })
    } else {
        clientes = await prisma.clientes.findMany()
    }

    res.status(200).json(clientes)
})

app.listen(3000)