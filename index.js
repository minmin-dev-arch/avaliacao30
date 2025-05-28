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


app.put('/sessoes/:id' , (req,res) => {
    const { id } = req.params;
    const {aluno,personal,tipo_treino,data,horario,observacoes} = req.body; 
    
    const query = 'UPDATE sessoes SET aluno = ?, personal = ?, tipo_treino  = ?, data = ?, horario = ?, observacoes = ? WHERE id = ?';
    conexao.query(query, [aluno,personal,tipo_treino,data,horario,observacoes,id], (err,results) => {
    if (err) {
        return res.status(500).send('Erro ao atualizar');
    }
    
    if(results.affectedRows === 0) {
        return res.status(404).send('sessão não encontrada');
    }
    
     res.send('Sessão  atualizada com sucesso');
     });
    });


    app.delete('/sessoes/:id', (req,res) => {
        const {id} = req.params;
        
        conexao.query('DELETE FROM sessoes WHERE id = ?' , [id], (err,results) => {
        if(err) {
            return res.status(404).send('Erro ao deletar');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Sessão não encontrada');
        }
        
        res.status(200).send('Sessão deletada com sucesso');
          });
        });
        


        app.post('/planos', (req, res) => {
            const {nome, duracao_meses,preco,descricao} = req.body
            if (!nome || typeof nome != 'string' || nome.trim() == '') {
                return res.status(400).send('Nome é obrigatório.');
            }
            
            if (!duracao_meses == undefined || !Number.isInteger(duracao_meses) || duracao_meses < 0) {
                return res.status(400).send('Data deve ser um número inteiro maior que 0.');
            }
            
            
            if (!preco == undefined || typeof preco != 'number' || preco <= 0) {
                return res.status(400).send('Preço deve ser um número positivo.');
            }
            
            console.log(req.body)
            
            conexao.query(
                'INSERT INTO planos (nome,duracao_meses,preco,descricao) VALUES (?,?,?,?)',
                [
                  nome,
                  duracao_meses,
                  preco,
                 descricao,
                ],
                () => {
                    res.status(201).send('Plano cadastrado com sucesso!')
                
                });
            })


        
        app.get('/planos', (req,res) => {
            conexao.query('SELECT nome,duracao_meses,preco,descricao  FROM planos',(err,results) => {
            if(err) {
                return res.status(500).send('Erro ao cadastrar plano!');
            }
                res.status(200).send(results)
            }); 
        });
        
        
        app.put('/planos/:id' , (req,res) => {
            const { id } = req.params;
            const {nome,duracao_meses,preco,descricao,} = req.body; 
            
            const query = 'UPDATE planos SET nome = ?, duracao_meses = ?, preco = ?, descricao = ?  WHERE id = ?';
            conexao.query(query, [nome,duracao_meses,preco,descricao,id], (err,results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar');
            }
            
            if(results.affectedRows === 0) {
                return res.status(404).send('Plano não encontrado');
            }
            
             res.send('Plano atualizado  com sucesso');
             });
            });
        
        
            app.delete('/planos/:id', (req,res) => {
                const {id} = req.params;
                
                conexao.query('DELETE FROM planos WHERE id = ?' , [id], (err,results) => {
                if(err) {
                    return res.status(404).send('Erro ao deletar');
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send('Plano não encontrado');
                }
                
                res.status(200).send('Plano deletado com sucesso');
                  });
                });
                

    
app.listen(3000,() => {

console.log("Servidor rodando em http://localhost:3000")

})
















