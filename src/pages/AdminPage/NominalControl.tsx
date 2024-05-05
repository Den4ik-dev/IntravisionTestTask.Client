import { Switch } from '@mui/material';

type NominalControlPropsType = {
  id: number;
  value: number;
  isBlocked: boolean;
  switchBlockNominal: (id: number) => void;
};

const NominalControl = ({
  id,
  value,
  isBlocked,
  switchBlockNominal,
}: NominalControlPropsType) => {
  return (
    <div className="nominal-control">
      <div className="nominal-control__value">{value}</div>
      <div>
        <Switch checked={!isBlocked} onChange={() => switchBlockNominal(id)} />
      </div>
    </div>
  );
};

export default NominalControl;
