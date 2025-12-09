export const paginatedResult = (result, page = 1, perPage = 10) => {
  const total = result.length;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const data = result.slice(start, end);

  return {
    data,
    pagination: {
      total,
      page,
      perPage,
      pages: Math.ceil(total / perPage),
    },
  };
};
export const applyFilters = async (data, filters = {}) => {
  let result = [...data];

  const { category, price, title } = filters;

  if (category) {
    result = result.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (price) {
    result = result.filter((item) => item.price == price);
  }

  if (title) {
    result = result.filter((item) =>
      item.title?.toLowerCase().includes(title.toLowerCase())
    );
  }

  return result;
};
