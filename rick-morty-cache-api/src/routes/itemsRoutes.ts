import { Router, Request, Response } from 'express';

import itemsController from '../controllers/itemsController';

const router = Router();

router.get('/', (_: Request, res: Response): void => {
  res.json({ message: 'Добро пожаловать в наше REST API!' });
});

router.get('/items', itemsController.getAllCharacters.bind(itemsController));
router.get('/items/:id', itemsController.getCharacterById.bind(itemsController));
router.post('/items', itemsController.addCharacter.bind(itemsController));
router.put('/items/:id', itemsController.updateCharacter.bind(itemsController));
router.delete('/items/:id', itemsController.deleteCharacter.bind(itemsController));
router.post('/cache/clear', itemsController.clearCache.bind(itemsController));
router.post('/cache/size', itemsController.setCacheSize.bind(itemsController));

export default router;
