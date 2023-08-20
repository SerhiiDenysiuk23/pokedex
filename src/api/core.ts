import {LinksType, Pokemon} from "../types/PockemonDataTypes";

const baseURL = 'https://pokeapi.co/api/v2/'

const getPokemonData = (data: any): Pokemon => {
  const {id, name, sprites, types, stats} = data
  const {back_default, front_default} = sprites
  return {id, name, sprites: {back_default, front_default}, types, stats}
}

export const requestList = async (list: LinksType[]) => {
  try {
    return await Promise.all(list.map(
      async (item) => {
        return getPokemonData(await (await fetch(item.url)).json())
      }
    ))
  } catch (e) {
    console.error(e)
  }
}

export const getAllPokemons = async (): Promise<LinksType[]> => {
  const linkList = await (await fetch(`${baseURL}pokemon/?limit=${3000}&offset=${0}`)).json()
  return linkList.results
}

export const getPokemonsByTag = async (tags: string[]): Promise<LinksType[]> => {
  const lists = await Promise.all(tags.map(async (tag) => {
      const linkList = await (await fetch(`${baseURL}type/${tag}?limit=${3000}&offset=${0}`)).json()
      return linkList.pokemon
    })
  )
  return lists.reduce((acc, value) => {
    value.forEach((item: any) => acc.push(item.pokemon))
    return acc
  }, []).sort((a: LinksType, b: LinksType) => {
    const a_i = parseInt(a.url.split('/').slice(-2)[0]);
    const b_i = parseInt(b.url.split('/').slice(-2)[0]);
    return a_i - b_i;
  })
}