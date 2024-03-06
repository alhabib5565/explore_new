import { useEffect, useState } from "react";
import { Tproduct } from "./filter.type";
import { uniqueCategory } from "./constant";
import { motion } from "framer-motion";

const FilterAnimation = () => {
  // state
  const [data, setData] = useState([]);
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState([]);

  // handle category activation
  const handleActive = (categoryName: string) => {
    setActive(categoryName);
    const filteredData = data.filter((item: Tproduct) => {
      if (categoryName !== "all") {
        return item.category === categoryName;
      } else {
        return item;
      }
    });

    setProducts(filteredData);
  };

  // Fetch product data
  useEffect(() => {
    fetch("product.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setProducts(data);
      });
  }, []);

  return (
    <div className=" my-10 p-4 lg:p-0">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-10 max-w-6xl w-full mx-auto">
        {/* card */}
        {products.map((item: Tproduct) => (
          <Card product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FilterAnimation;

const Card = ({ product }: { product: Tproduct }) => {
  //animation variants
  const imageVariants = {
    initial: { x: -100, opacity: 0 },
    whileInView: {
      x: 0,
      rotate: [20, 0],
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        bounce: "0.5",
      },
    },
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    whileInView: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, type: "spring", bounce: "0.5" },
    },
  };
  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      transition={{ staggerChildren: 0.5 }}
      layout
      key={product.id}
      className="p-6 bg-slate-100 rounded-lg space-y-4 overflow-hidden"
    >
      <motion.img
        variants={imageVariants}
        className="w-full  h-[250px] rounded-md"
        src={product.image}
        alt=""
      />
      <motion.h1
        variants={textVariants}
        className="text-3xl italic text-slate-700 truncate font-medium "
      >
        {product.title}
      </motion.h1>
      <motion.p
        variants={textVariants}
        className="text-xl text-slate-700 font-medium  "
      >
        {product.description.split(" ").slice(0, 5).join(" ")}
      </motion.p>
    </motion.div>
  );
};
