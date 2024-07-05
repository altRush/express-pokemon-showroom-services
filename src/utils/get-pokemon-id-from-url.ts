const getPokemonIdFromUrl = (url: string) => {
  const delimiter = '/';
  const start = 6;
  const tokens = url.split(delimiter).slice(start);
  const rawResult = tokens.join(delimiter);
  const result = rawResult.replace(/\/$/g, '');
  return result;
};

export default getPokemonIdFromUrl;
