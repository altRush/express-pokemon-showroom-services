export interface PokemonProfile {
	name: string;
	url: string;
	sprite: string;
	types: PokemonTypes[];
}

export type PokemonTypes = {
	type: {
		name: string;
		url: string;
	};
};
