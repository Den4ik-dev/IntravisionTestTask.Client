import api from "./AxiosService"

export const getCoinsInMachine = async () => {
  const response = await api.get('api/machineWithDrinks/coins');

  return response.data;
}