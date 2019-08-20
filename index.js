const express = require('express');

const server = express();

server.use(express.json()); //Express lerá preferencialmente JSON

/**
 * VETOR de usuários
 */
const users = ['Pedro', 'Undersvaldo', "Marconato"]
/**
 * Rita teste apeanas com parametro para saber se o retorno será
 * em json ou não
 */
server.get('/teste', (request, response) => {
    console.log('Inciando rota teste');
    const { retorno } = request.query;

    console.log(retorno);
    
    
    if(retorno == 'json'){
        console.log('Aqui vamos retornar um Json');
        return response.send({ message : 'Hello World'});
    }
    return response.send('Hello World');
});

/**
 * Rota retorna o nome do usuário também com parametros de query
 */
server.get('/returnMyName', (request, response) => {
    const nome = request.query.name;

    return response.send({
        name: `Seu nome é ${nome}`
    });
});

/**
 * Rota retorna usuário id pelos parametros de rota
 */
server.get('/users/:id', (request, response) => {
    const id = request.params.id;

     return response.json({user:users[id]});
});


/**
 * Rota retorna usuário id pelos parametros de rota
 */
server.put('/users/:id', (request, response) => {
    const id = request.params.id;
    const { name } = request.body;

    users[id] = name;

    return response.json({users});
});


server.post('/users', (request, response) => {
    const {name} = request.body;

    users.push(name);

    return response.json({users});
});

server.delete('/users/:id', (request, response) => {
    const { id } = request.params;

    users.splice(id, 1);

    return response.send(); 
})


server.listen(3000);
