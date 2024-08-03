import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../filterAnimation/hooks/useDebounce";

type TAutoComplete = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchSuggetions: (inputValue: string) => Promise<any>;
};

const AutoComplete = ({ fetchSuggetions }: TAutoComplete) => {
  const [inputValue, setInputValue] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const debounce = useDebounce({ value: inputValue });

  const handleInputChage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const getSuggetions = async () => {
    const result = await fetchSuggetions(debounce);
    setSuggetions(result);
  };

  useEffect(() => {
    getSuggetions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  const handleSuggetionClick = (value: string) => {
    setInputValue(value);
    setSuggetions([]);
  };

  return (
    <div className="relative">
      <input
        className="shadow border-2 border-blue-200 rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="search..."
        value={inputValue}
        onChange={handleInputChage}
      />
      {suggetions.length > 1 && (
        <ul className="h-[300px] overflow-y-scroll top-14 absolute bg-white z-50 left-1/2 -translate-x-1/2 py-2 rounded-md shadow border">
          {suggetions.map((suggetion: { id: number; title: string }) => (
            <li
              onClick={() => handleSuggetionClick(suggetion.title)}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer truncate "
              key={suggetion.id}
            >
              {suggetion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
