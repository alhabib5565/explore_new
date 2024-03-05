import { motion } from "framer-motion";
const AnimatedLinks = () => {
  return (
    <div className="max-w-4xl w-full bg-zinc-700 p-10 rounded-md text-white space-y-5 ">
      <Links />
      <Links />
      <Links />
    </div>
  );
};

export default AnimatedLinks;

const Links = () => {
  return (
    <motion.a
      initial="initial"
      whileHover="whileHover"
      href=""
      className="flex justify-between items-center group border-b-2 border-neutral-400 hover:border-neutral-50 pb-5"
    >
      <div className="space-y-5 ">
        <motion.h2
          variants={{
            initial: {
              y: 0,
            },
            whileHover: {
              y: -20,
            },
          }}
          transition={{
            staggerChildren: 0.1,
            staggerDirection: -1,
            delayChildren: 0.1,
            type: "spring",
          }}
          className="text-5xl font-bold text-neutral-400 group-hover:text-neutral-50"
        >
          {"Lorem ipsum".split("").map((letter, index) => (
            <motion.span
              className="inline-flex min-w-3"
              variants={{
                initial: {
                  y: 0,
                  rotateX: 30,
                },
                whileHover: {
                  y: 20,
                },
              }}
              transition={{
                type: "spring",
              }}
              key={index}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
        <p className="text-lg font-semibold text-neutral-400 group-hover:text-neutral-50">
          {" "}
          adipisicing elit. Illum, officia?
        </p>
      </div>
      <div className="-translate-x-[100px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </motion.a>
  );
};
