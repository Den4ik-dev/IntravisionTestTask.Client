import BasketDrinkLine from '../models/BasketDrinkLine';
import DrinkLine from '../models/DrinkLine';
import api from './AxiosService';

export const AddDrinkInBasket = (
  drink: DrinkLine,
  setDrinksInBasket: React.Dispatch<React.SetStateAction<BasketDrinkLine[]>>
) => {
  setDrinksInBasket((prev) => {
    const drinkLine: BasketDrinkLine | undefined = prev.find(
      (drinkLine) => drinkLine.id == drink.id
    );

    if (drinkLine == undefined) {
      return [...prev, { ...drink, drinksQuantityInBasket: 1 }];
    }

    if (drinkLine.drinksQuantityInBasket == drinkLine.drinksQuantityInMachine) {
      return prev;
    }

    return prev.map((dl) =>
      dl.id == drinkLine.id
        ? { ...dl, drinksQuantityInBasket: dl.drinksQuantityInBasket + 1 }
        : dl
    );
  });
};

export const GetDrinksQuantityInBasket = (
  drinkId: string,
  drinksInBasket: BasketDrinkLine[]
) => {
  const drinkLine: BasketDrinkLine | undefined = drinksInBasket.find(
    (dl) => dl.id == drinkId
  );

  return drinkLine ? drinkLine.drinksQuantityInBasket : 0;
};

export const PayDrinks = (
  drinksInBasket: BasketDrinkLine[],
  setDrinksInBasket: React.Dispatch<React.SetStateAction<BasketDrinkLine[]>>,
  droppedCoins: number[],
  setDroppedCoins: React.Dispatch<React.SetStateAction<number[]>>,
  setDrinks: React.Dispatch<React.SetStateAction<DrinkLine[]>>
) => {
  const purchases = drinksInBasket.map((dl) => ({
    drinkLineId: dl.id,
    quantity: dl.drinksQuantityInBasket,
  }));

  const order = { purchases, coins: droppedCoins };

  api.post('api/machineWithDrinks/purchases', order).then((response) => {
    alert(`Сдача: ${response.data}`);

    setDrinks((prev) =>
      prev.map((drink) => ({
        ...drink,
        drinksQuantityInMachine:
          drink.drinksQuantityInMachine -
          (drinksInBasket.find((dl) => dl.id == drink.id)
            ?.drinksQuantityInBasket ?? 0),
      }))
    );

    setDrinksInBasket([]);
    setDroppedCoins([]);
  });
};
