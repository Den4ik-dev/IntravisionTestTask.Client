import DrinkLine from '../models/DrinkLine';
import Drink from '../models/Drink';
import api from './AxiosService';

export const AddDrinkInBasket = (
  drink: Drink,
  setDrinksInBasket: React.Dispatch<React.SetStateAction<DrinkLine[]>>
) => {
  setDrinksInBasket((prev) => {
    const drinkLine: DrinkLine | undefined = prev.find(
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
  drinksInBasket: DrinkLine[]
) => {
  const drinkLine: DrinkLine | undefined = drinksInBasket.find(
    (dl) => dl.id == drinkId
  );

  return drinkLine ? drinkLine.drinksQuantityInBasket : 0;
};

export const PayDrinks = (
  drinksInBasket: DrinkLine[],
  setDrinksInBasket: React.Dispatch<React.SetStateAction<DrinkLine[]>>,
  droppedCoins: number[],
  setDroppedCoins: React.Dispatch<React.SetStateAction<number[]>>,
  setDrinks: React.Dispatch<React.SetStateAction<Drink[]>>
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
