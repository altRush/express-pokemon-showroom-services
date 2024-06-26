import sql from '../utils/db';

export async function getStoredPokemonByNameModel(pokemonName: string) {
	const pokemon = await sql`
    SELECT pokemon_name, url, sprite, pokemon_types
    FROM stored_pokemons
    WHERE pokemon_name = ${pokemonName}
  `;
	return pokemon;
}
