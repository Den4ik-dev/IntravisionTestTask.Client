import { useContext, useEffect } from 'react';
import Drink from '../../models/Drink';
import { BasketContext } from '../../contexts/BasketContext';
import {
  AddDrinkInBasket,
  GetDrinksQuantityInBasket,
} from '../../services/BasketService';
import './DrinkMiniCard.style.css';

const DrinkMiniCard = ({
  id,
  name,
  imagePath,
  price,
  drinksQuantityInMachine,
}: Drink) => {
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
          <img src={imagePath} alt={name} />
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
