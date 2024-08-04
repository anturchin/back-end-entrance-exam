import express from 'express';

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});
