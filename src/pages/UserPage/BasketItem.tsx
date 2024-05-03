import BasketDrinkLine from '../../models/BasketDrinkLine';
import { getQueryWithoutString } from '../../services/CachingService';

const BasketItem = ({ drink }: { drink: BasketDrinkLine }) => {
  return (
    <div>
      <div className="basket-item__img">
        {drink.imagePath ? (
          <img src={getQueryWithoutString(drink.imagePath)} alt={drink.name} />
        ) : (
          <img src="/drinks/drink-empty-image.png" alt={drink.name} />
        )}
      </div>
      <div>{drink.name}</div>
      <div>Кол-во в корзине: {drink.drinksQuantityInBasket}</div>
      <div>Цена за штуку: {drink.price}</div>
    </div>
  );
};

export default BasketItem;
