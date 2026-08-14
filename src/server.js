// src/server.js
import express from 'express';

const app = express();
const PORT = 3000;

// Перший маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// GET-запит до кореневого маршруту "/"
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello world!',
  });
});

// GET-запит до маршруту "/health"
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'Ok!',
  });
});
// Список усіх користувачів
app.get('/users', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Alice' }]);
});

// Конкретний користувач за id
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.status(200).json({ id: userId, name: 'Jacob' });
});
// src/server.js

// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
