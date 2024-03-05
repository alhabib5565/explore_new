// import image1 from "../assets/loaderImg/image1.jpg";
// import image2 from "../assets/loaderImg/image2.jpg";
// import image3 from "../assets/loaderImg/image3.jpg";
// import image4 from "../assets/loaderImg/image4.jpg";
// import image5 from "../assets/loaderImg/image5.jpg";
// import image1 from "../assets/Event/eventImg1.png";
// import image2 from "../assets/Event/eventImg2.png";
// import image3 from "../assets/Event/eventImg3.png";
// import image4 from "../assets/Event/eventImg4.png";
// import image5 from "../assets/Event/eventImg5.png";

import { motion } from "framer-motion";

const Loader = () => {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1.6,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };
  return (
    <div className="h-screen w-full grid place-items-center">
      <motion.div
        variants={container}
        animate="show"
        initial="hidden"
        className="h-[90%] grid  grid-cols-7 grid-rows-7 gap-4 max-w-5xl mx-auto w-full overflow-hidden"
      >
        <motion.div
          variants={item}
          className="bg-red-500 rounded-md w-full h-full col-span-2 row-span-2"
        >
          1
        </motion.div>
        <div className="rounded-md w-full h-full col-span-3 row-span-2">2</div>
        <motion.div
          variants={item}
          className="bg-red-500 rounded-md w-full h-full col-span-2 row-span-2"
        >
          3
        </motion.div>
        <div className=" rounded-md w-full h-full col-span-2 row-span-3">4</div>
        <motion.div
          variants={item}
          className="bg-red-500 rounded-md w-full h-full col-span-3 row-span-3"
        >
          5
        </motion.div>
        <div className=" rounded-md w-full h-full col-span-2 row-span-3">6</div>
        <motion.div
          variants={item}
          className="bg-red-500 rounded-md w-full h-full col-span-2 row-span-2"
        >
          7
        </motion.div>
        <div className=" rounded-md w-full h-full col-span-3 row-span-2">8</div>
        <motion.div
          variants={item}
          className="bg-red-500 rounded-md w-full h-full col-span-2 row-span-2"
        >
          9
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;

// type TLoaderImage = {
//   image: string;
//   className?: string;
// };
// const LoaderImage = ({ image, className }: TLoaderImage) => {
//   return (
//     <motion.div className={`bg-red-400 w-[30%] h-[40%] col-span-2 ${className}`}>
//       <img className="w-full h-full" src={image} alt="" />
//     </motion.div>
//   );
// };
