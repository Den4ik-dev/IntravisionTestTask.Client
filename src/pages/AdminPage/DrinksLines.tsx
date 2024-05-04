import { useEffect, useRef, useState } from 'react';
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
  const { admin_secret } = useParams();
  const nav = useNavigate();

  const [drinkLines, setDrinkLines] = useState<DrinkLine[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const refTotalCount = useRef<number>(0);

  useEffect(() => {
    if (fetching) {
      api
        .get(`/api/drinkLines?limit=15&page=${currentPage}`)
        .then((resp) => {
          setDrinkLines((prev) => [...prev, ...resp.data]);
          setCurrentPage(currentPage + 1);
          refTotalCount.current = resp.headers['x-total-count'] as number;
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

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
    <div
      className="admin-page-drinks"
      onScroll={(e) => {
        const drinksBlock = e.target as HTMLDivElement;

        if (
          drinksBlock.scrollHeight -
            (drinksBlock.scrollTop + window.innerHeight) <
            100 &&
          drinkLines.length < refTotalCount.current
        ) {
          setFetching(true);
        }
      }}
    >
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
