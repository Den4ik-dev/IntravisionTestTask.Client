import { DrinkLineOfChange } from '../pages/AdminPage/ChangeDrinkLineForm';
import api from './AxiosService';

type DrinkOfChangeDto = {
  name: string;
  price: number;
};

type DrinkLineOfChangeDto = {
  drink: DrinkOfChangeDto;
  drinksQuantityInMachine: number;
};

export const editDrinkLineRequest = (
  drinkLine: DrinkLineOfChange,
  admin_secret: string
) => {
  const drinkLineOfChange: DrinkLineOfChangeDto = {
    drink: { ...drinkLine },
    drinksQuantityInMachine: drinkLine.drinksQuantityInMachine,
  };

  return api.put(`api/drinkLines/${drinkLine.id}`, drinkLineOfChange, {
    headers: { Authorization: admin_secret },
  });
};

export const addDrinkLineImage = (
  drinkLineId: string,
  formData: FormData,
  admin_secret: string
) => {
  return api.post(`api/drinkLines/${drinkLineId}/image`, formData, {
    headers: { Authorization: admin_secret },
  });
};

export const removeDrinkLine = (drinkLineId: string, admin_secret: string) => {
  return api.delete(`api/drinkLines/${drinkLineId}`, {
    headers: { Authorization: admin_secret },
  });
};
