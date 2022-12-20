import { useEffect, useState } from "react";
import axios from 'axios';
const CharactersAxios = () => {
        const [characters, setCharacters] = useState([])
	useEffect(() => {
		const API = 'https://rickandmortyapi.com/api/character/1';
		const getCharaters = async () => {
			const response = await axios(API);
			setCharacters(response.data);
		};
		getCharaters();
                
        }, []);

        return(
                <div className="Characters">
                        {/* {characters.map(character=>(
                                <h2 key={character.id}>{character.name}</h2>
                        ))} */}
                </div>
        )
};

export default CharactersAxios