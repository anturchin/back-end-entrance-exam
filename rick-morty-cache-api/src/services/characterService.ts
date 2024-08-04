import { CharacterType, ResultType } from '../models';

class CharacterService {
  public async getCharacterById(id: number): Promise<ResultType> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return res.json() as unknown as ResultType;
  }

  public async getCharacters(): Promise<CharacterType> {
    const res = await fetch(`https://rickandmortyapi.com/api/character`);
    return res.json() as unknown as CharacterType;
  }
}

export default new CharacterService();
