const express = require('express');

const server = express();

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
})

/**
 * Rota retorna o nome do usuário também com parametros de query
 */
server.get('/returnMyName', (request, response) => {
    const nome = request.query.name;

    return response.send({
        name: `Seu nome é ${nome}`
    });
})

/**
 * Rota retorna usuário id pelos parametros de rota
 */
server.get('/users/:id', (request, response) => {
    const id = request.params.id;

     return response.json({user:"Buscando usuário "+id });
})

server.listen(3000);
