import DrinkLine from '../../models/DrinkLine';
import { getQueryWithoutString } from '../../services/CachingService';

type DrinkLinesItemParamsType = {
  id: string;
  name: string;
  imagePath: string;
  price: number;
  drinksQuantityInMachine: number;
  editDrinkLine: (id: string) => void;
  remove: (id: string) => void;
};

const DrinkLinesItem = ({
  id,
  name,
  imagePath,
  price,
  drinksQuantityInMachine,
  editDrinkLine,
  remove,
}: DrinkLinesItemParamsType) => {
  return (
    <div className="admin-page-drinks__item">
      <div
        className="admin-page-drinks__item-img"
        style={{ userSelect: 'none' }}
      >
        <img src={getQueryWithoutString(imagePath)} alt={name} />
      </div>
      <div>{name}</div>
      <div>Цена: {price}</div>
      <div>Кол-во в автомате: {drinksQuantityInMachine}</div>

      <div>
        <button onClick={() => editDrinkLine(id)}>Изменить</button>
      </div>
      <div>
        <button onClick={() => remove(id)}>Удалить</button>
      </div>
    </div>
  );
};

export default DrinkLinesItem;
