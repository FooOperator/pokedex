/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '../../styles/pokemon[id].module.scss';
import { Pokemon } from "../../types/types";

export default function Details() {
    const {
        query: { id }
    } = useRouter();

    const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

    useEffect(() => {
        async function getOnePokemon() {
            const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
            const data = await response.json();
            console.log('this is raw data', data);
            setCurrentPokemon(data);
        }

        if (id) {
            getOnePokemon();
        }
    }, [id]);

    if (!currentPokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles["container"]}>
            <Head>
                <title>{currentPokemon?.name ?? 'Loading...'}</title>
            </Head>
            <div className={styles['button-container']}>
                <Link href={'/'}>
                    <a>
                        <button className={styles['back-button']}>
                            Back
                        </button>
                    </a>
                </Link>
            </div>
            <div className={styles['content']}>
                <img
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${currentPokemon.image}`}
                    alt={currentPokemon.name}
                    className={styles['pokemon-image']}
                />
                <div className={styles['description-column']}>
                    <div>
                        <h1>{currentPokemon.name}</h1>
                        <h2>{currentPokemon.type.slice(0, 2).join('/')}</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentPokemon.stats.map((stat, index) =>
                                    <tr
                                        key={index}
                                        className={styles['stat-row']}
                                    >
                                        <td className={styles['name-data']}>{stat.name}</td>
                                        <td className={styles['value-data']}>{stat.value}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}