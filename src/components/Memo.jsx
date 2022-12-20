import React, { useState, useEffect, useReducer, useMemo } from 'react'
const Memo = () => {
        const [characters, setCharacters] = useState([])
        const [search, setSearch] = useState('')
        const initialState = {
                favorites: []
        }
        const favoriteReducer = (state, action)=> {
                switch(action.type){
                        case 'ADD_TO_FAVORITES':
                                return {
                                        ...state,
                                        favorites: [...state.character, action.payload]
                                }
                        default:
                                return state
                }
        }

        const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
        const handleClick = favorite => {
                dispatch({
                        type: 'ADD_TO_FAVORITES',
                        payload: favorite
                })
        }
        const handleSearch =  (event)=> {
                setSearch(event.target.value)
        }
        // const filteredUsers = characters.filter((user)=> {
        //         return user.name.toLowerCase().includes(search.toLowerCase())
        // })
        const filteredUsers = useMemo(()=>
                characters.filter((user)=> {
                        return user.name.toLowerCase().includes(search.toLowerCase())
                }),
                [characters, search]
        )
        useEffect(()=>{
                fetch('https://rickandmortyapi.com/api/character/')
                .then(response => response.json())
                .then(data => setCharacters(data.results))
        },[])
        return(
                <div className="Characters">
                                {favorites.favorites.map(favorite=>(
                                        <li key={favorite.id}>
                                                {favorite.name}
                                        </li>
                                ))}
                        <div className='Search'>
                                <input type="text" value={search} onChange={handleSearch}></input>
                        </div>
                        {filteredUsers.map(character=>(
                                <div className='item'>
                                        <h2 key={character.id}>{character.name}</h2>
                                        <button type='button' onClick={()=>handleClick(character)}>Agregar a favoritos</button>
                                </div>
                        ))}
                </div>
        )
}
export default Memo