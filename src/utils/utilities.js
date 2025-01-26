export const filterCategories = (categories, type) => {
  return categories
    .filter((category) => category.type === type)
    .sort((a, b) => a.createdAt - b.createdAt);
};
