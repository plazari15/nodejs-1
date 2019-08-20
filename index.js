const express = require('express');

const server = express();

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

server.listen(3000);
