import { useEffect, useState } from "react";

const useGetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return categories.slice(0, 10);
};

export default useGetAllCategories;
