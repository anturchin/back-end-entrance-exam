import { NextFunction, Request, Response } from 'express';

import CacheService from '../services/cacheService';
import CharacterService from '../services/characterService';
import { SetCacheSizeRequestBody } from '../types';

export const getCharacterById = async (
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

export const getAllCharacters = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await CharacterService.getCharacters();
    const characters = data.results;
    characters.forEach((character) => CacheService.set(character));
    res.status(200).json({ items: characters });
  } catch (error) {
    next(error);
  }
};

export const clearCache = (_: Request, res: Response) => {
  CacheService.clear();
  res.status(204).end();
};

export const setCacheSize = (
  req: Request<Record<string, unknown>, Record<string, unknown>, SetCacheSizeRequestBody>,
  res: Response
): void => {
  const size = Number(req.body.size);
  CacheService.setMaxSize(size);
  res.status(204).end();
};
