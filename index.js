const express = require('express');

const server = express();

server.use(express.json()); //Express lerá preferencialmente JSON

/**
 * VETOR de usuários
 */
const users = ['Pedro', 'Undersvaldo', "Marconato"]

/**
 * Criando um Middleware (GLOBAL) para manipular todas as requisições
 *
 * Middleware é um interceptador
 */
server.use((request, response, next) => {
    console.time('Request');
    console.log(`Método: ${request.method}; URL: ${request.url}`);

    next();

    console.timeEnd('Request');
});

/**
 * Criando agora um Middleware Local
 */
function checkUserExists(request, response, next) {
    if(!request.body.name){
        return response.status(400).json({ error : "User not found on request body"});
    }

    return next();
}

/**
 * Criando um Middleware apenas para verificar se o usuário existe
 */
function checkUserInArray(request, response, next) {
    const user = users[request.params.id];
    if(!user){
        return response.status(400).json({error: "User does not exists"});
    }

    //Middleware pode alterar req e response (principalmente req)

    request.user = user;

    return next();
}
/**
 * Rita teste apeanas com parametro para saber se o retorno será
 * em json ou não
 */
server.get('/teste',  (request, response) => {
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
server.get('/users/:id', checkUserInArray, (request, response) => {
    //const id = request.params.id;

     return response.json({user:request.user});
});


/**
 * Rota retorna usuário id pelos parametros de rota
 */
server.put('/users/:id', checkUserExists, checkUserInArray,  (request, response) => {
    const id = request.params.id;
    const { name } = request.body;

    users[id] = name;

    return response.json({users});
});


server.post('/users', checkUserExists, (request, response) => {
    const {name} = request.body;

    users.push(name);

    return response.json({users});
});

server.delete('/users/:id', checkUserInArray, (request, response) => {
    const { id } = request.params;

    users.splice(id, 1);

    return response.send(); 
})


server.listen(3000);
