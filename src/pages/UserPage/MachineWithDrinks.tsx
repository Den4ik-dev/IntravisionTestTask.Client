import { useEffect, useRef, useState } from 'react';
import DrinkMiniCard from '../../components/DrinkMiniCard/DrinkMiniCard';
import DrinkLine from '../../models/DrinkLine';
import api from '../../services/AxiosService';

const MachineWithDrinks = ({
  drinks,
  setDrinks,
}: {
  drinks: DrinkLine[];
  setDrinks: React.Dispatch<React.SetStateAction<DrinkLine[]>>;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const refTotalCount = useRef<number>(0);

  useEffect(() => {
    if (fetching) {
      api
        .get(`/api/drinkLines?limit=15&page=${currentPage}`)
        .then((resp) => {
          setDrinks((prev) => [...prev, ...resp.data]);
          setCurrentPage(currentPage + 1);
          refTotalCount.current = resp.headers['x-total-count'] as number;
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  return (
    <div
      className="machine-with-drinks"
      onScroll={(e) => {
        const drinksBlock = e.target as HTMLDivElement;

        if (
          drinksBlock.scrollHeight -
            (drinksBlock.scrollTop + window.innerHeight) <
            100 &&
          drinks.length < refTotalCount.current
        ) {
          setFetching(true);
        }
      }}
    >
      {drinks.map((drink) => (
        <DrinkMiniCard key={drink.id} {...drink} />
      ))}
    </div>
  );
};

export default MachineWithDrinks;
