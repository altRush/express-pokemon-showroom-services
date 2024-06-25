import sql from '../utils/db';

export async function getStoredPokemonByNameModel(pokemonName: string) {
	const pokemon = await sql`
    SELECT pokemon_name, url, sprite, pokemon_types
    FROM test_get_pokemon
    WHERE pokemon_name = ${pokemonName}
  `;
	return pokemon;
}
