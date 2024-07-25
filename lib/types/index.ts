export type Character = {
  name: string;
  image: string;
};

export type ApiResponse = {
  characters: {
    info: {
      count: number;
    };
    results: Character[];
  };
};
