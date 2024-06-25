import sql from '../utils/db';
import dotenv from 'dotenv';

dotenv.config();

export async function getPokemonByNameModel(pokemonName: string) {
	const pokemon = await sql`
    SELECT pokemon_name, url, sprite, pokemon_types
    FROM test_get_pokemon
    WHERE pokemon_name = ${pokemonName}
    LIMIT 1
  `;
	return pokemon;
}
