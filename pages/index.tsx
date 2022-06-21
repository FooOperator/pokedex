/* eslint-disable @next/next/no-img-element */
import { log } from 'console'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { PokemonType, Pokemon, POKEMON_TYPES } from '../types/pokemon'

type SearchParams = {
  name: string;
  type: [type: PokemonType, checked: boolean][];
}

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
      const data = await response.json();

      setPokemon(data);
      setFilteredPokemon(data);
    }

    getPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter(pokemon => {
        const { name } = pokemon;
        return name.toLowerCase().includes(searchTerm.toLowerCase())
      }));

  }, [searchTerm, pokemon]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSearchTerm(value);
  }

  const handleCollapsedToggle = () => setCollapsed(!collapsed);

  return (
    <div className={styles['container']}>
      <Head>
        <title>Pokedex</title>
      </Head>
      <div className={styles['search']}>
        <input
          className={styles['search-bar']}
          name={'name'}
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder={'Search by name'}
        />
      </div>
      {
        filteredPokemon.length > 1 ?
          <div className={styles['grid']}>
            {
              filteredPokemon.map(item =>
                <div className={styles['card']} key={item.id}>
                  <Link href={`/pokemon/${item.id}`}>
                    <a>
                      <img
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${item.image}`}
                        width={150}
                        height={150}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </div>
              )
            }
          </div> :
          <h1 className={styles['none-found']}>
            None found
          </h1>
      }
    </div>
  );

}

export default Home;





