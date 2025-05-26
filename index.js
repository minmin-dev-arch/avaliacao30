const express = require('express')
const mysql = require('mysql2');

const app = express()

const conexao = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '', 
database: 'centro_treinamento',
})


app.use(express.json())

app.post('/sessoes', (req,res) => {
    const sessoes= {
        aluno: req.body.aluno,
        personal: req.body.personal,
        tipo_treino: req.body.tipo_treino,
        data: req.body.data,
        horario: req.body.horario,
        observacoes: req.body.observacoes,
    }
     
    if(!sessoes.aluno || typeof sessoes.aluno != 'string' || sessoes.aluno.trim() == '') {
        return res.status(400).send('Este campo é obrigatório.');
    }
     
    if (!sessoes.personal || typeof sessoes.personal != 'string' || sessoes.personal.trim() == '') {
        return res.status(400).send('Este campo é obrigatório.');
    }

    if (!sessoes.tipo_treino || typeof sessoes.tipo_treino != 'string' || sessoes.tipo_treino.trim() == '') {
        return res.status(400).send('Este campo é obrigatório.');

    }
     
    if (!sessoes.data || typeof sessoes.data != 'string' || sessoes.data.trim() == '') {
        return res.status(400).send('Este campo é obrigatório.');
    
    } 

    if (!sessoes.horario || typeof sessoes.horario != 'string' || sessoes.horario.trim() == '') {
        return res.status(400).send('Este campo é obrigatório.');
    }
    conexao.query(
        'INSERT INTO sessoes (aluno,personal,tipo_treino,data,horario, observacoes) VALUES (?,?,?,?,?,?)', 
       [sessoes.aluno,sessoes.personal,sessoes.tipo_treino,sessoes.data,sessoes.horario,sessoes.observacoes],
     () => {
       res.status(201).send('Horario agendado com sucesso!')
     });
})

app.get('/sessoes', (req,res) => {
    conexao.query('SELECT aluno,personal,tipo_treino,data,horario,observacoes FROM sessoes',(err,results) => {
    if(err) {
        return res.status(500).send('Erro ao cadastrar aluno ou agendar horario!');
    }
        res.status(200).send(results)
    }); 
});


app.listen(3000,() => {

console.log("Servidor rodando em http://localhost:3000")

})
















