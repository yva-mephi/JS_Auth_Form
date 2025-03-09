import { createServer } from 'http';

const PORT = 5000;

const server = createServer((req, res) => {

})

server.listen(PORT, () => {
    console.log(`сервер развернут на порту ${PORT}`);
})