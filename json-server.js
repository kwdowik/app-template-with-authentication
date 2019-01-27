const jsonServer = require('json-server');
const server = jsonServer.create();
const uuid = require('uuid');
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/auth/login/': '/login'
}));

server.use((req, res, next) => authorize(req, res, next))

server.use((req, res, next) =>
    isAuthorized(req) ? next() : res.sendStatus(401))

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running')
});

const authorize = (req, res, next) => {
    if (req.url === '/login' && req.method === 'POST') {
        const body = generateResponse(isValidUser(req));
        res.send(body.status, body);
    } else {
        next();
    }
}

const isAuthorized = (req) => {
    const { token } = req.body;
    console.log('isAuthorized ', req.body);
    return Boolean(token);
}

const isValidUser = (req) => {
    const { email, password } = req.body;
    return email === 'user' && password === 'password';
}

const generateResponse = (isAuth) => isAuth ? { status: 200, ok: true, token: uuid.v1() } : { status: 401, ok: false };