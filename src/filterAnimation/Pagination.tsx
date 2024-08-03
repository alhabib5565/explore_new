import { ChangeEvent, Dispatch } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

type TPaginationProps = {
  totalItems: number;
  skip: number;
  limit: number;
  setPaginationInfo: Dispatch<
    React.SetStateAction<{
      limit: number;
      skip: number;
    }>
  >;
};

const Pagination = ({
  totalItems,
  skip,
  limit,
  setPaginationInfo,
}: TPaginationProps) => {
  console.log(totalItems, limit, skip);

  const totalPageNumber = [...Array(Math.ceil(totalItems / limit)).keys()];
  const options = [10, 20, 30, 40, 100];

  const handlePageChage = (pageNo: number) => {
    setPaginationInfo((prevInfo) => ({ ...prevInfo, skip: pageNo }));
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPaginationInfo(() => ({
      skip: 0,
      limit: Number(event.target.value),
    }));
  };

  const handlePreviousPage = () => {
    setPaginationInfo((prevInfo) => ({
      ...prevInfo,
      skip: skip === 0 ? totalPageNumber[totalPageNumber.length - 1] : skip - 1,
    }));
  };

  const handleNextPage = () => {
    setPaginationInfo((prevInfo) => ({
      ...prevInfo,
      skip: skip === totalPageNumber[totalPageNumber.length - 1] ? 0 : skip + 1,
    }));
  };

  return (
    <div className="flex justify-center gap-1 mt-4">
      <button
        onClick={handlePreviousPage}
        className={`size-10 border-2 border-blue-500  rounded-full bg-transparent grid place-items-center`}
      >
        <BiChevronLeft size={20} />
      </button>
      {totalPageNumber.length > 0 &&
        totalPageNumber.map((pageNumber) => (
          <button
            onClick={() => handlePageChage(pageNumber)}
            className={`size-10 border-2 border-blue-500  rounded-full ${
              skip === pageNumber ? "bg-blue-500 text-white" : "bg-transparent"
            }`}
          >
            {pageNumber}
          </button>
        ))}

      <button
        onClick={handleNextPage}
        className={`size-10 border-2 border-blue-500  rounded-full bg-transparent grid place-items-center`}
      >
        <BiChevronRight size={20} />
      </button>

      <select
        value={limit}
        onChange={(e) => handleLimitChange(e)}
        className=" px-1 sm:px-2 md:px-3 border-2 border-blue-500 bg-transparent h-10 rounded-md"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
