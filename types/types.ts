export const POKEMON_TYPES = <const>['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

export type PokemonType = typeof POKEMON_TYPES[number];

export type Pokemon = {
    id: string;
    name: string;
    image: string;
    stats: [
        { name: 'HP', value: number },
        { name: 'Attack', value: number },
        { name: 'Defense', value: number },
        { name: 'Sp. Attack', value: number },
        { name: 'Sp. Defense', value: number },
        { name: 'Speed', value: number }
    ];
    type: PokemonType[];
}

export type SearchParams = {
    name: string;
    type: [type: PokemonType, checked: boolean][];
}