import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";

const datas = [
  {
    id: 1,
    title: "Accordion Item 1",
    description: "This is the description for accordion item 1.",
  },
  {
    id: 2,
    title: "Accordion Item 2",
    description: "Here is the description for accordion item 2.",
  },
  {
    id: 3,
    title: "Accordion Item 3",
    description: "Accordion item 3 has this description.",
  },
  {
    id: 4,
    title: "Accordion Item 4",
    description: "Description for accordion item 4 goes here.",
  },
  {
    id: 5,
    title: "Accordion Item 5",
    description: "The description for accordion item 5 is provided here.",
  },
];

const Accordion = () => {
  const [isOpen, setIsOpen] = useState<null | number>(null);

  const handleAccordionOpen = (id: number) => {
    setIsOpen(id);
  };
  return (
    <div className="bg-zinc-800 min-h-screen w-full grid place-items-center">
      <div className="p-6 rounded-lg bg-white max-w-3xl w-full">
        <h1 className="text-2xl font-medium text-blue-500">
          Frequently Ask Questions
        </h1>
        <div className="space-y-4 mt-4">
          {datas.map((data) => (
            <motion.div
              layout
              key={data.id}
              className="bg-slate-100 p-2 rounded cursor-pointer"
            >
              <motion.div
                onClick={() => handleAccordionOpen(data.id)}
                initial="initial"
                whileHover="whileHover"
                layout
                className="flex justify-between items-center "
              >
                {data.id === isOpen ? (
                  <h1 className="text-lg font-medium text-sky-500">
                    {data.title}
                  </h1>
                ) : (
                  <motion.h1
                    variants={{
                      initial: { y: 0 },
                      whileHover: { y: 10 },
                    }}
                    transition={{
                      staggerChildren: 0.09,
                      type: "spring",
                      delayChildren: 0.2,
                      duration: 0.2,
                    }}
                    className="text-lg font-medium text-sky-500"
                  >
                    {data.title.split("").map((c, index) => (
                      <motion.span
                        className="inline-flex min-w-1"
                        variants={{
                          initial: { y: 0 },
                          whileHover: { y: -10 },
                        }}
                        transition={{
                          type: "spring",
                        }}
                        key={index}
                      >
                        {c}
                      </motion.span>
                    ))}
                  </motion.h1>
                )}
                <button>
                  {isOpen === data.id ? (
                    <FaMinus className="text-sky-600 " />
                  ) : (
                    <FaPlus className="text-sky-600 " />
                  )}
                </button>
              </motion.div>
              {isOpen === data.id && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  layout
                >
                  {data.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
