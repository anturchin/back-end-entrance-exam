import express, { NextFunction, Request, Response } from 'express';
import router from '../routes/itemsRoutes';
import setupSwagger from '../swagger/swaggerConfig';

const app = express();

setupSwagger(app);

app.use(express.json());
app.use(router);

app.use((_: Request, res: Response): void => {
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
