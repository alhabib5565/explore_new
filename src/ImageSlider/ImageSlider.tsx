import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { motion, useMotionValue } from "framer-motion";
const images = [
  "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
  "https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
  "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
  "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
];

const DRAGE = 50;

const ImageSlider = () => {
  const [activeImage, setActiveImage] = useState(0);
  const dragX = useMotionValue(0);

  const prevImage = () => {
    setActiveImage(activeImage === 0 ? images.length - 1 : activeImage - 1);
  };
  const nextImage = () => {
    setActiveImage(activeImage === images.length - 1 ? 0 : activeImage + 1);
  };

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAGE && activeImage < images.length - 1) {
      setActiveImage((pv) => pv + 1);
    } else if (x >= DRAGE && activeImage > 0) {
      setActiveImage((pv) => pv - 1);
    }
  };

  return (
    <div className="bg-slate-700 h-screen w-full grid place-items-center">
      <div className="max-w-lg w-full">
        <div className=" relative rounded-md overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            style={{
              x: dragX,
            }}
            onDragEnd={onDragEnd}
            animate={{ translateX: `-${activeImage * 100}%` }}
            className="flex w-full h-full"
          >
            {images.map((image, index) => (
              // thumbnail image
              <motion.div
                animate={activeImage === index ? { scale: 1 } : { scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                style={{ backgroundImage: `url(${image})` }}
                className={`bg-center bg-cover max-w-lg w-full h-[300px] shrink-0 rounded-md cursor-grab active:cursor-grabbing `}
                key={index}
              ></motion.div>
            ))}
          </motion.div>
          {/* arrow left */}
          <button
            onClick={prevImage}
            className="size-12 bg-gray-400/80 hover:bg-white absolute top-1/2  translate-y-[-50%] rounded-full left-5 grid place-items-center hover:shadow-lg"
          >
            <BsArrowLeft className="size-8" />
          </button>
          {/* arrow right */}
          <button
            onClick={nextImage}
            className="size-12 bg-gray-400/80 hover:bg-white absolute top-1/2 translate-y-[-50%] rounded-full right-5 grid place-items-center hover:shadow-lg"
          >
            <BsArrowRight className="size-8" />
          </button>
        </div>
        <IndicatorImage
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
      </div>
    </div>
  );
};

export default ImageSlider;

type TIndicatorProps = {
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
};
const IndicatorImage = ({ activeImage, setActiveImage }: TIndicatorProps) => {
  return (
    <div className="flex gap-2 mt-2">
      {/*  indicator image */}
      {images.map((image, index) => (
        <button
          onClick={() => setActiveImage(index)}
          className={`w-full h-[50px] ${
            index === activeImage
              ? "border rounded"
              : "opacity-50 hover:opacity-100"
          }`}
          key={index}
        >
          <img src={image} className={`w-full object-cover h-full rounded`} />
        </button>
      ))}
    </div>
  );
};
