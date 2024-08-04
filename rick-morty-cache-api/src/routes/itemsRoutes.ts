import { Router, Request, Response } from 'express';

import itemsController from '../controllers/itemsController';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

router.get('/items', itemsController.getAllCharacters);
router.get('/items/:id', itemsController.getCharacterById);
router.post('/cache/clear', itemsController.clearCache);
router.post('/cache/size', itemsController.setCacheSize);

export default router;
