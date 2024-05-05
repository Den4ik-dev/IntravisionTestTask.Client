import api from './AxiosService';

export const getIsAdmin = (admin_secret: string) => {
  return api.get('api/admins/isAdmin', {
    headers: { Authorization: admin_secret },
  });
};
