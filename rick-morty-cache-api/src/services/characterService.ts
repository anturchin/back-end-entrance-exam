import { CharacterType, ResultType } from '../models';

class CharacterService {
  async getCharacterById(id: string): Promise<ResultType> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return res.json() as unknown as ResultType;
  }

  async getCharacters(): Promise<CharacterType> {
    const res = await fetch(`https://rickandmortyapi.com/api/character`);
    return res.json() as unknown as CharacterType;
  }
}

export default new CharacterService();
