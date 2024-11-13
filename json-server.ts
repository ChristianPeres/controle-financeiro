import jsonServer from 'json-server';
import { Request, Response } from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Rota de login personalizada
server.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const db = router.db as any; // Type assertion para acessar o método get
  const user = db.get('users').find({ email, password }).value() as User | undefined;

  if (user) {
    res.json({ 
      id: user.id,
      email: user.email,
      name: user.name,
      token: 'fake-jwt-token'
    });
  } else {
    res.status(400).json({ message: 'Email ou senha inválidos' });
  }
});

// Use o roteador padrão para outras rotas
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server está rodando na porta 3000');
});