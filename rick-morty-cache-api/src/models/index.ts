export type CharacterType = {
  info: InfoType;
  results: ResultType[];
};

export type ResultType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginType;
  location: OriginType;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type OriginType = {
  name: string;
  url: string;
};

export type InfoType = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};
