import { useContext, useEffect } from 'react';
import DrinkLine from '../../models/DrinkLine';
import { BasketContext } from '../../contexts/BasketContext';
import {
  AddDrinkInBasket,
  GetDrinksQuantityInBasket,
} from '../../services/BasketService';
import './DrinkMiniCard.style.css';
import { getQueryWithoutString } from '../../services/CachingService';

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
    <button
      disabled={
        droppedCoins?.reduce((droppedCoins, coin) => droppedCoins + coin, 0)! -
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
    >
      <div style={{ userSelect: 'none' }} className="drink-mini-card__img">
        {imagePath ? (
          <img src={getQueryWithoutString(imagePath)} alt={name} />
        ) : (
          <img src="/drinks/drink-empty-image.png" alt={name} />
        )}
      </div>
      <div>{name}</div>
      <div>Цена: {price}</div>
      <div>Кол-во в автомате: {drinksQuantityInMachine}</div>
    </button>
  );
};

export default DrinkMiniCard;
