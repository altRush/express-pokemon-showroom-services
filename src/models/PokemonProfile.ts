export interface PokemonProfile {
	name: string;
	url: string;
	sprite: string;
	types: PokemonTypes[];
}

export type PokemonTypes = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};
