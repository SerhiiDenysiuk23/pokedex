import React, {useState} from 'react';
import PokemonList from "./components/PokemonList";
import {getAllPokemons} from "./api/core";
import {LinksType} from "./types/PockemonDataTypes";

function App() {
  const [allPokemons, setAllPokemons] = useState<LinksType[]>([])

  React.useLayoutEffect(()=>{
    getAllPokemons().then(res => {
      setAllPokemons(res)
    })
  },[])

  return (
    <div className="App">
      <header>
        Pokedex
      </header>
      <PokemonList allPokemonLinks={allPokemons}/>
    </div>
  );
}

export default App;
