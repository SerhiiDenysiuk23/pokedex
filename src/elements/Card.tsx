import React, {FC} from 'react';
import {Pokemon} from "../types/PockemonDataTypes";
import {typeColor} from "../services/typeColor";

const Card: FC<{ pokemon: Pokemon }> = ({pokemon}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleStatsClick = () => {
    setIsExpanded(prevState => !prevState)
  }

  return (
    <div className='card'>
      <div className='card__image'><img src={pokemon.sprites.front_default} alt=""/></div>
      <div className='card__content'>
        <div className='card__name'>{pokemon.name}</div>
        <div className='card__types'>
          {
            pokemon.types.map(item => <div
              style={{backgroundColor: typeColor(item.type.name)}}
              key={item.type.url}>
              {item.type.name}
            </div>)
          }
        </div>
        <div className={`card__stats ${isExpanded ? 'card__stats__expanded' : ''}`}>
          {
            pokemon.stats.map(item => <div key={item.stat.url}>
              {item.stat.name}: {item.base_stat}
            </div>)
          }
          <span onClick={handleStatsClick}>Stats {isExpanded ? "▼" : "▲"}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;