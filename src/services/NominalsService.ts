import api from './AxiosService';

export const getAllNominals = async () => {
  const response = await api.get('api/nominals');

  return response.data;
};

export const switchBlockNominalRequest = (
  nominalId: number,
  admin_secret: string
) => {
  return api.post(`api/nominals/${nominalId}/isBlocked`, null, {
    headers: { Authorization: admin_secret },
  });
};
