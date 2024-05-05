import { useContext, useEffect } from 'react';
import DrinkLine from '../../models/DrinkLine';
import { BasketContext } from '../../contexts/BasketContext';
import {
  AddDrinkInBasket,
  GetDrinksQuantityInBasket,
} from '../../services/BasketService';
import { getQueryWithoutString } from '../../services/CachingService';
import './UserPage.style.css';

const DrinkMiniCard = ({
  id,
  name,
  imagePath,
  price,
  drinksQuantityInMachine,
}: DrinkLine) => {
  const { droppedCoins, totalPrice, setDrinksInBasket, drinksInBasket } =
    useContext(BasketContext);

  return (
    <div className="drink-mini-card ">
      <button
        disabled={
          droppedCoins?.reduce(
            (droppedCoins, coin) => droppedCoins + coin,
            0
          )! -
            totalPrice! <
            price ||
          GetDrinksQuantityInBasket(id, drinksInBasket!) ==
            drinksQuantityInMachine
            ? true
            : false
        }
        onClick={() =>
          AddDrinkInBasket(
            {
              id,
              name,
              imagePath,
              price,
              drinksQuantityInMachine,
            },
            setDrinksInBasket!
          )
        }
        className="drink-card-body drink-mini-card__body"
      >
        <div style={{ userSelect: 'none' }} className="drink-mini-card__img">
          {imagePath ? (
            <img src={getQueryWithoutString(imagePath)} alt={name} />
          ) : (
            <img src="/drinks/drink-empty-image.png" alt={name} />
          )}
        </div>
        <div className="drink-mini-card__body">
          <div>{name}</div>
          <div>Цена: {price}</div>
          <div>Кол-во в автомате: {drinksQuantityInMachine}</div>
        </div>
      </button>
    </div>
  );
};

export default DrinkMiniCard;
