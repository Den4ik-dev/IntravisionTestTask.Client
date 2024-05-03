import { useState } from 'react';
import DrinkLine from '../../models/DrinkLine';

type ChangeDrinkLineFormPropsType = {
  id: string;
  name: string;
  imagePath: string;
  price: number;
  drinksQuantityInMachine: number;
  edit: (
    drinkLine: DrinkLineOfChange,
    formDataWithImage: FormData,
    setError?: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  cancelEdit: (id: string) => void;
};

export type DrinkLineOfChange = {
  id: string;
  name: string;
  image?: File;
  price: number;
  drinksQuantityInMachine: number;
};

const ChangeDrinkLineForm = ({
  id,
  name,
  imagePath,
  price,
  drinksQuantityInMachine,
  edit,
  cancelEdit,
}: ChangeDrinkLineFormPropsType) => {
  const [drinkLineOfChange, setDrinkLineOfChange] = useState<DrinkLineOfChange>(
    { id, name, price, drinksQuantityInMachine }
  );

  const [error, setError] = useState<string>('');

  return (
    <div>
      <form
        action="put"
        onSubmit={async (e) => {
          console.log('click');
          e.preventDefault();

          const formDataWithImage = new FormData(e.currentTarget);
          const image = formDataWithImage.get('image') as File;

          await edit(
            { ...drinkLineOfChange, image },
            formDataWithImage,
            setError
          );
        }}
      >
        <div>
          <img src={imagePath} alt={name} />
          <div>
            <input type="file" name="image" />
          </div>
        </div>
        <div>
          Название:{' '}
          <input
            type="text"
            placeholder="Название продукта"
            defaultValue={drinkLineOfChange.name}
            onChange={(e) =>
              setDrinkLineOfChange((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          Цена:{' '}
          <input
            type="number"
            placeholder="Цена за одну штуку"
            defaultValue={drinkLineOfChange.price}
            onChange={(e) =>
              setDrinkLineOfChange((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
        </div>
        <div>
          Кол-во в автомате:{' '}
          <input
            type="number"
            placeholder="Количество в автомате"
            defaultValue={drinkLineOfChange.drinksQuantityInMachine}
            onChange={(e) =>
              setDrinkLineOfChange((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
        </div>
        <div style={{ color: 'red' }}>{error}</div>
        <div>
          <input type="submit" value="Сохранить" />
        </div>
      </form>
      <div>
        <button onClick={() => cancelEdit(id)}>Отмена</button>
      </div>
    </div>
  );
};

export default ChangeDrinkLineForm;
