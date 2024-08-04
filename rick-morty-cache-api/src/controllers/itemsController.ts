import { NextFunction, Request, Response } from 'express';

import CacheService from '../services/cacheService';
import CharacterService from '../services/characterService';
import { generateUniqueId } from '../utils/idGenerator';
import { SetCacheSizeRequestBody } from '../types';
import { ResultType } from '../models';

class ItemController {
  public getCharacterById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = Number(req.params.id);
    let character = CacheService.get(id);

    if (!character) {
      try {
        character = await CharacterService.getCharacterById(id);
        CacheService.set(character);
      } catch (error) {
        next(error);
      }
    }
    res.status(200).json(character);
  };

  public getAllCharacters = async (
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await CharacterService.getCharacters();
      const characters = data.results;
      characters.forEach((character) => CacheService.set(character));
      res.status(200).json({ items: CacheService.getCache() });
    } catch (error) {
      next(error);
    }
  };

  public addCharacter(req: Request, res: Response): void {
    const id = generateUniqueId();
    const { item } = req.body as SetCacheSizeRequestBody;
    const newItem: ResultType = { ...item, id };
    CacheService.set(newItem);
    res.status(201).json({ newItem });
  }

  public updateCharacter(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const { item } = req.body as SetCacheSizeRequestBody;
    const existingItem = CacheService.get(id);

    if (existingItem) {
      CacheService.set({ ...existingItem, ...item });
      res.json({ item: { ...existingItem, ...item } });
    } else {
      res.status(404).json({ message: 'Элемент не найден в кэше' });
    }
  }

  public deleteCharacter(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const item = CacheService.get(id);

    if (item) {
      CacheService.setMaxSize(CacheService.getMaxSize() - 1);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Элемент не найден в кэше' });
    }
  }

  public clearCache = (_: Request, res: Response) => {
    CacheService.clear();
    res.status(204).end();
  };

  public setCacheSize = (
    req: Request<Record<string, unknown>, Record<string, unknown>, SetCacheSizeRequestBody>,
    res: Response
  ): void => {
    const size = Number(req.body.size);
    CacheService.setMaxSize(size);
    res.status(204).end();
  };
}

export default new ItemController();
