import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use((err: unknown, _: Request, res: Response, next: NextFunction): void => {
  if (err instanceof Error) {
    res.status(500).json({
      message: err.message,
    });
  }
  next();
});

export { app };
