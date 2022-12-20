import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import Search from './Search'
import useCharacters from '../hooks/useCharacters'
const Hooks = () => {
        const API = "https://rickandmortyapi.com/api/character/"
        const [search, setSearch] = useState('')
        const searchInput = useRef(null)
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
        const handleSearch = useCallback(
                () => {
                        setSearch(searchInput.current.value)
                },
                []
        )
        const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
        const handleClick = favorite => {
                dispatch({
                        type: 'ADD_TO_FAVORITES',
                        payload: favorite
                })
        }
        const characters = useCharacters(API)
        const filteredUsers = useMemo(()=>
                characters.filter((user)=> {
                        return user.name.toLowerCase().includes(search.toLowerCase())
                }),
                [characters, search]
        )

        return(
                <div className="Characters">
                                {favorites.favorites.map(favorite=>(
                                        <li key={favorite.id}>
                                                {favorite.name}
                                        </li>
                                ))}
                                <Search search={search} searchInput={searchInput} handleSearch={handleSearch}></Search>
                        {filteredUsers.map(character=>(
                                <div className='item'>
                                        <h2 key={character.id}>{character.name}</h2>
                                        <button type='button' onClick={()=>handleClick(character)}>Agregar a favoritos</button>
                                </div>
                        ))}
                </div>
        )
}
export default Hooks