import React from 'react';
import {types} from "../services/typeColor";
import {getPokemonsByTag} from "../api/core";
import {LinksType} from "../types/PockemonDataTypes";

interface Props {
  setPickedLinks(links: LinksType[], isSearchMode: boolean): void
}

const PickByTags: React.FC<Props> = ({setPickedLinks}) => {
  const [tags, setTags] = React.useState<string[]>([])
  const [isFirstRender, setIsFirstRender] = React.useState(true)

  const handleItemClick = (tag: string) => {
    if (tags.includes(tag)){
      setTags(tags.filter((item) => item !== tag))
      return
    }
    setTags([tag, ...tags])
  }

  React.useEffect(() => {
    if (!isFirstRender) {
      setIsFirstRender(false)
      return
    }

    if (tags.length > 0)
      getPokemonsByTag(tags).then(res => {
        setPickedLinks(res, true)
      })
    else
      setPickedLinks([], false)

  }, [tags])

  const typeList = Object.keys(types)
  return (
    <ul className={"tag-list"}>
      {
        typeList.map(item => <li className={tags.includes(item) || !tags.length ? "active": ""} onClick={() => {
          handleItemClick(item)
        }} key={item} style={{backgroundColor: types[item]}}>{item}</li>)
      }
    </ul>
  );
};

export default PickByTags;