import { useEffect, useState } from "react";
import { Tproduct } from "./filter.type";
import { uniqueCategory } from "./constant";
import { motion } from "framer-motion";

const FilterAnimation = () => {
  // state
  const [data, setData] = useState([]);
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState([]);
  //   extract uniqe category for create filter button
  //   const categories = data.map((item: Tproduct) => item.category);
  //   const uniqueCategory = [...new Set(categories)];
  //   uniqueCategory.unshift("all");
  //   console.log(uniqueCategory);

  const handleActive = (categoryName: string) => {
    setActive(categoryName);
    const filteredData = data.filter((item: Tproduct) => {
      if (categoryName !== "all") {
        return item.category === categoryName;
      } else {
        return item;
      }
    });
    console.log({ filteredData, active });

    setProducts(filteredData);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
        setProducts(data.products);
      });
    console.log("render");
  }, []);

  return (
    <div className="md:my-24 my-14 p-4">
      <div className="flex justify-center gap-4 flex-wrap">
        {/* category buttons */}
        {uniqueCategory.map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => handleActive(categoryName)}
            className={`${
              active === categoryName
                ? "bg-blue-700 text-white"
                : "bg-transparent text-blue-700"
            } px-3 py-1  rounded-md border-2 capitalize relative border-blue-700 group font-medium hover:text-white z-10`}
          >
            {categoryName}
            <span className="absolute top-0 left-0 rounded duration-300 bg-blue-700 h-full w-full scale-x-0 group-hover:scale-x-100 origin-left -z-10"></span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 mt-10 max-w-5xl w-full mx-auto">
        {/* card */}
        {products.map((item: Tproduct) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            layout
            key={item.id}
          >
            <img
              className="w-full  h-[250px] object-cover rounded-md"
              src={item.thumbnail}
              alt=""
            />
            <h1 className="text-xl text-blue-700 ">{item.category}</h1>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilterAnimation;
