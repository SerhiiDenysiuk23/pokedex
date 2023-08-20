import React from 'react';
import {requestList} from "../api/core";
import {LinksType, Pokemon} from "../types/PockemonDataTypes";
import Card from "../elements/Card";
import Pagination from "../elements/Pagination";
import Search from "../elements/Search";
import PickByTags from "../elements/PickByTags";
import reducer, {
  setAllLinksAction,
  setLimitOffsetAction,
  setPickedLinksAction,
  toggleSearchModeAction
} from "../store/reducer";
import {State} from "../types/ReducerTypes";

interface Props {
  allPokemonLinks: { name: string, url: string }[]
}

const initReducer: State = {
  allLinks: [],
  pickedLinks: [],
  linksToView: [],
  count: 0,
  limit: 10,
  offset: 0,
  isSearchMode: false
}


const PokemonList: React.FC<Props> = ({allPokemonLinks}) => {

  const [state, dispatch] = React.useReducer(reducer, initReducer)

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([])

  const handleSetOffset = (num: number) => {
    dispatch(setLimitOffsetAction(state.limit, num))
  }
  const handleSetLimit = (num: number) => {
    dispatch(setLimitOffsetAction(num, 0))
  }
  const handlePickLinks = (list: LinksType[], isSearchMode: boolean) => {
    dispatch(toggleSearchModeAction(isSearchMode))
    dispatch(setPickedLinksAction(list))
  }

  React.useEffect(() => {
    requestList(state.linksToView).then((res: Pokemon[] | undefined) => {
      if (!res)
        return
      setPokemons(res)
    })
  }, [state.linksToView])

  React.useEffect(() => {
    dispatch(setAllLinksAction(allPokemonLinks))
  }, [allPokemonLinks])

  return (
    <main>
      <section className={"container filters"}>
        <Search allPokemonLinks={allPokemonLinks} setSearchedLinks={handlePickLinks}/>
        <PickByTags setPickedLinks={handlePickLinks}/>
      </section>
      <section className={`${pokemons.length ? 'pokemon-list' : ""} container`}>
        {
          pokemons.length ?
          pokemons.map(item => <Card key={item.id} pokemon={item}/>)
            : <div className={"message-not-found"}>Can't find any pokemon</div>
        }
      </section>
      <section className="container">
        <Pagination limit={state.limit} count={state.count} setOffset={handleSetOffset}/>

        <div className='limit pagination'>
          <span>Limit Content</span>
          <div className={`page ${state.limit === 10 && 'active'}`} onClick={()=>{handleSetLimit(10)}}>10</div>
          <div className={`page ${state.limit === 20 && 'active'}`} onClick={()=>{handleSetLimit(20)}}>20</div>
          <div className={`page ${state.limit === 50 && 'active'}`} onClick={()=>{handleSetLimit(50)}}>50</div>
        </div>
      </section>
    </main>
  );
};

export default PokemonList;