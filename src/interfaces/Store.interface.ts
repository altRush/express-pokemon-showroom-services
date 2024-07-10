type JsArrayToSqlStringifiedArrayConverter = (stringArray: string[]) => string;

interface StorePokemonResponse {
  success: boolean;
  message?: string;
}

export { JsArrayToSqlStringifiedArrayConverter, StorePokemonResponse };
