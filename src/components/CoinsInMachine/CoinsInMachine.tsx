import './CoinsInMachine.style.css';

const CoinsInMachine = ({ coins }: { coins: number }) => {
  return (
    <div className="coins-in-machine">
      В автомате <span className="coins-in-machine__value">{coins}</span> монет
    </div>
  );
};

export default CoinsInMachine;
