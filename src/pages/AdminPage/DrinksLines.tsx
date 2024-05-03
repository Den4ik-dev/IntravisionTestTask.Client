import { useEffect, useState } from 'react';
import DrinkLine from '../../models/DrinkLine';
import DrinkLinesItem from './DrinkLinesItem';
import './AdminPage.style.css';
import ChangeDrinkLineForm, { DrinkLineOfChange } from './ChangeDrinkLineForm';
import {
  addDrinkLineImage,
  editDrinkLineRequest,
  removeDrinkLine,
} from '../../services/DrinkLinesService';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorFromServer from '../../models/ErrorFromServer';
import api from '../../services/AxiosService';

const DrinkLines = () => {
  const [drinkLines, setDrinkLines] = useState<DrinkLine[]>([]);

  const { admin_secret } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    api.get('api/drinkLines?page=1').then((response) => {
      let data = response.data as DrinkLine[];

      setDrinkLines([...drinkLines, ...data]);
    });
  }, []);

  const editDrinkLine = (id: string) => {
    const newDrinkLines = drinkLines.map((drinkLine) =>
      drinkLine.id == id
        ? { ...drinkLine, isChanging: !drinkLine.isChanging }
        : drinkLine
    );

    setDrinkLines(newDrinkLines);
  };

  const cancelEdit = (id: string) => {
    const newDrinkLines = drinkLines.map((drinkLine) =>
      drinkLine.id == id ? { ...drinkLine, isChanging: false } : drinkLine
    );

    setDrinkLines(newDrinkLines);
  };

  const edit = async (
    drinkLine: DrinkLineOfChange,
    formDataWithImage: FormData,
    setError?: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      await editDrinkLineRequest(drinkLine, admin_secret!);

      if (drinkLine.image?.size) {
        console.log(formDataWithImage);
        console.log(formDataWithImage.get('image'));
        const response = await addDrinkLineImage(
          drinkLine.id,
          formDataWithImage,
          admin_secret!
        );
        console.log(response);
      }

      nav(0);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        setError!((e.response?.data as ErrorFromServer).detail);
      }
    }
  };

  const remove = async (id: string) => {
    await removeDrinkLine(id, admin_secret!);

    const newDrinkLines = drinkLines.filter((dl) => dl.id != id);

    setDrinkLines(newDrinkLines);
  };

  return (
    <div className="admin-page-drinks">
      {drinkLines.map((drinkLine) =>
        drinkLine.isChanging ? (
          <ChangeDrinkLineForm
            key={drinkLine.id}
            {...drinkLine}
            edit={edit}
            cancelEdit={cancelEdit}
          />
        ) : (
          <DrinkLinesItem
            key={drinkLine.id}
            {...drinkLine}
            remove={remove}
            editDrinkLine={editDrinkLine}
          />
        )
      )}
    </div>
  );
};

export default DrinkLines;
