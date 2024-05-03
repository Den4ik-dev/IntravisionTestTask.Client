export const getQueryWithoutString = (query: string) => {
  return query + `?___lastmod____=${Math.random()}`;
};
