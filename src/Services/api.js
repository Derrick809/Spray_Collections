const API_URL = "http://localhost:5000/api";

export const getProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`
  );

  return response.json();
};