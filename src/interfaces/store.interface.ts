type JsArrayToSqlArrayConverter = (array: string[] | number[]) => string;

interface StorePokemonResponse {
  success: boolean;
  message?: string;
}

export { JsArrayToSqlArrayConverter, StorePokemonResponse };
