import { Router, Request, Response } from 'express';
import itemsController from '../controllers/itemsController';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Проверка работоспособности API
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: Возвращает сообщение о работоспособности API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Добро пожаловать в наше REST API!"
 */
router.get('/', (_: Request, res: Response): void => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Операции с элементами
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Получить список всех элементов
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Список всех элементов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ResultType'
 */
router.get('/items', itemsController.getAllCharacters.bind(itemsController));

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Получить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запрашиваемый элемент
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   $ref: '#/components/schemas/ResultType'
 */
router.get('/items/:id', itemsController.getCharacterById.bind(itemsController));

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Создать новый элемент
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 $ref: '#/components/schemas/ResultType'
 *           example:
 *             item:
 *               name: "Rick Sanchez"
 *               status: "Alive"
 *               species: "Human"
 *               type: ""
 *               gender: "Male"
 *               origin:
 *                 name: "Earth"
 *                 url: "https://rickandmortyapi.com/api/location/1"
 *               location:
 *                 name: "Earth"
 *                 url: "https://rickandmortyapi.com/api/location/20"
 *               image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
 *               episode: ["https://rickandmortyapi.com/api/episode/1"]
 *               url: "https://rickandmortyapi.com/api/character/1"
 *               created: "2017-11-04T18:48:46.250Z"
 *     responses:
 *       201:
 *         description: Созданная запись
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newItem:
 *                   $ref: '#/components/schemas/ResultType'
 */
router.post('/items', itemsController.addCharacter.bind(itemsController));

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Обновить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 $ref: '#/components/schemas/ResultType'
 *           example:
 *             item:
 *               name: "Updated Name"
 *               status: "Alive"
 *     responses:
 *       200:
 *         description: Обновленная запись
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   $ref: '#/components/schemas/ResultType'
 */
router.put('/items/:id', itemsController.updateCharacter.bind(itemsController));

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Удалить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Успешное удаление записи
 */
router.delete('/items/:id', itemsController.deleteCharacter.bind(itemsController));

/**
 * @swagger
 * /cache/clear:
 *   post:
 *     summary: Очистить кэш
 *     tags:
 *       - Cache
 *     responses:
 *       204:
 *         description: Кэш очищен
 */
router.post('/cache/clear', itemsController.clearCache.bind(itemsController));

/**
 * @swagger
 * /cache/size:
 *   post:
 *     summary: Установить размер кэша
 *     tags:
 *       - Cache
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: integer
 *           example:
 *             size: 100
 *     responses:
 *       204:
 *         description: Размер кэша установлен
 */
router.post('/cache/size', itemsController.setCacheSize.bind(itemsController));

export default router;
