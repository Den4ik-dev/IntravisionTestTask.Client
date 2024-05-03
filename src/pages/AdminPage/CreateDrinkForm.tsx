import { FormEvent, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/AxiosService';
import axios from 'axios';
import ErrorFromServer from '../../models/ErrorFromServer';
import './AdminPage.style.css';

type DrinkOfCreateDto = {
  name: string;
  price: number;
};

type DrinkLineOfCreateDto = {
  drink: DrinkOfCreateDto;
  drinksQuantityInMachine: number;
};

const cleanDrinkLineOfCreate: DrinkLineOfCreateDto = {
  drink: { name: '', price: 0 },
  drinksQuantityInMachine: 0,
};

const CreateDrinkForm = () => {
  const { admin_secret } = useParams();
  const nav = useNavigate();
  const [drinkLineOfCreate, setDrinkLineOfCreate] =
    useState<DrinkLineOfCreateDto>(cleanDrinkLineOfCreate);
  const [errorMessage, setErrorMessage] = useState<string>();
  const imageRef = useRef();

  const fetchToServer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    try {
      if ((formData.get('image') as File).size == 0) {
        return setErrorMessage('Вы не указали изображение напитка');
      }

      const response = await api.post('api/drinkLines', drinkLineOfCreate, {
        headers: { Authorization: admin_secret },
      });

      await api.post(`api/drinkLines/${response.data}/image`, formData, {
        headers: { Authorization: admin_secret },
      });

      setErrorMessage('');
      setDrinkLineOfCreate(cleanDrinkLineOfCreate);
      nav(0);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrorMessage((e.response?.data as ErrorFromServer).detail);
      }
    }
  };

  return (
    <form
      onSubmit={fetchToServer}
      encType="multipart/form-data"
      style={{ padding: '10px 0' }}
    >
      <div>
        <input type="file" name="image" />
      </div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Название продукта"
          value={drinkLineOfCreate.drink.name}
          onChange={(e) =>
            setDrinkLineOfCreate((prev) => ({
              ...prev,
              drink: { ...prev.drink, name: e.target.value },
            }))
          }
        />
      </div>
      <div>
        <input
          type="number"
          name="price"
          placeholder="Цена за одну штуку"
          onChange={(e) =>
            setDrinkLineOfCreate((prev) => ({
              ...prev,
              drink: { ...prev.drink, price: Number(e.target.value) },
            }))
          }
        />
      </div>
      <div>
        <input
          type="number"
          name="quantity"
          placeholder="Количество в автомате"
          onChange={(e) =>
            setDrinkLineOfCreate((prev) => ({
              ...prev,
              drinksQuantityInMachine: Number(e.target.value),
            }))
          }
        />
      </div>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <div>
        <input type="submit" value="Добавить новый напиток" />
      </div>
    </form>
  );
};

export default CreateDrinkForm;
