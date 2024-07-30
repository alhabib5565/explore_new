import { ChangeEvent, FormEvent, useState } from "react";

type TFormData = {
  fullName: string;
  bloadGroup: string;
};

const GetFormatedInputValue = () => {
  const [formData, setFormData] = useState<TFormData>({
    fullName: "",
    bloadGroup: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    console.log(inputValue);

    let value: string = "";

    switch (inputName) {
      case "fullName":
        {
          value = inputValue
            .split(" ")
            .map((text) => text[0] && text[0].toUpperCase() + text.slice(1))
            .join(" ");
        }
        break;
      case "bloadGroup":
        value = inputValue.toUpperCase();
        break;

      default:
        break;
    }
    setFormData((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  console.log("render");

  return (
    <div className="bg-[#EDF2F7] grid place-items-center h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Full Name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Bload Group"
            >
              Bload Group
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="Bload Group"
              name="bloadGroup"
              value={formData.bloadGroup}
              onChange={handleInputChange}
              placeholder="Bload Group"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetFormatedInputValue;

/*import { ChangeEvent, FormEvent, useReducer } from "react";

type TFormData = {
  fullName: string;
  bloadGroup: string;
};

const initialState = {
  fullName: "",
  bloadGroup: "",
};

const reducer = (
  state: TFormData,
  action: { inputName: string; inputValue: string }
) => {
  switch (action.inputName) {
    case "fullName": {
      const value = action.inputValue
        .split(" ")
        .map((text: string) => text[0] && text[0].toUpperCase() + text.slice(1))
        .join(" ");
      return {
        ...state,
        [action.inputName]: value,
      };
    }
    case "bloadGroup":
      return {
        ...state,
        [action.inputName]: action.inputValue.toUpperCase(),
      };

    default:
      break;
  }
};

const GetFormatedInputValue = () => {
  const [formData, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    dispatch({ inputName, inputValue });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  console.log("render");

  return (
    <div className="bg-[#EDF2F7] grid place-items-center h-screen">
      </div>
  );
};

export default GetFormatedInputValue;
*/
