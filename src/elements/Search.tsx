import React, {useEffect, useState} from 'react';
import {LinksType} from "../types/PockemonDataTypes";

interface Props {
  allPokemonLinks: { name: string, url: string }[]
  setSearchedLinks(links: LinksType[], isSearchMode: boolean): void
}

const Search: React.FC<Props> = ({allPokemonLinks, setSearchedLinks}) => {
  const [searchRequest, setSearchRequest] = useState("")
  const [searchResponse, setSearchResponse] = useState<typeof allPokemonLinks>([])
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    if (searchRequest.length === 0)
      setIsOpen(false)
    else
      setIsOpen(true)
  }, [searchRequest])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRequest(event.target.value)
    setSearchResponse(allPokemonLinks.filter(item => item.name.startsWith(event.target.value.toLowerCase())))
  }

  const handleInputClick = () => {
    setIsOpen(true)
  }

  const handleVariantClick = (item: LinksType) => {
    setSearchedLinks([item], true)
  }
  const handleSearchIconClick = () => {
    setSearchedLinks(searchResponse, searchRequest.length > 0)
    setIsOpen(false)
  }

  return (
    <form className="search_form">
      <input
        type="text"
        value={searchRequest}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Search..."
      />

      <ul className="searchResult">
        {
          searchResponse && isOpen
            ? searchResponse.map(item => {
              return <li key={item.name} onClick={() => {
                handleVariantClick(item)
              }} className="searchResult-item">{item.name}</li>
            })
            : null
        }
      </ul>
      <span onClick={() => {
        handleSearchIconClick()
      }} className={"icon search_form__btn"}>🔍︎</span>
    </form>
  );
};

export default Search;