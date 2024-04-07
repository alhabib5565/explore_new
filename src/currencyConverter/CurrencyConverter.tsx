import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const CurrencyConverter = () => {
  // state
  const [amount, setAmount] = useState(0);
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 }); //conversion_rates
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState<null | number>(null);

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/f72bb2870cf796cb8057ce44/latest/USD`
    )
      .then((res) => res.json())
      .then((data) => setRates(data.conversion_rates));
  }, [fromCurrency]);

  // converter function
  const handleConvert = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/f72bb2870cf796cb8057ce44/latest/${fromCurrency}`
    );
    const data = await response.json();
    const fetchedRates = data.conversion_rates;

    const convertedAmount = fetchedRates[toCurrency] * amount;

    setConvertedAmount(convertedAmount);
  };

  return (
    <div className="bg-slate-100 min-h-screen h-full w-full grid place-items-center">
      <div className="bg-white max-w-[500px] w-full rounded-xl p-6 my-10">
        <h1 className="text-2xl font-medium border-b-2 pb-2">
          Currency Converters
        </h1>

        <div>
          {/* currency input filed */}
          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Amount:
            </label>
            <CurrencyInput
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
              value={amount}
              onValueChange={(amount) => setAmount(Number(amount))}
              intlConfig={{ locale: "en-US", currency: fromCurrency }}
              allowDecimals={true}
              allowNegativeValue={false}
              placeholder="Please enter amount"
            />
          </div>

          <div className="w-full flex justify-between items-center gap-4 mt-4">
            {/* from currency select */}
            <Select
              setCurrency={setFromCurrency}
              currency={fromCurrency}
              htmlFor="fromCurrecny"
              label="From"
              rates={rates}
            />

            {/* to currency select */}
            <Select
              setCurrency={setToCurrency}
              currency={toCurrency}
              htmlFor="toCurrecny"
              label="To"
              rates={rates}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleConvert}>Convert</Button>
          </div>
          {toCurrency !== fromCurrency && !!convertedAmount && (
            <p className="mt-4 text-lg font-medium text-green-600">
              Converted Amount: {convertedAmount.toFixed(3)} {toCurrency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

type TSelect = {
  rates: Record<string, number>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  htmlFor: string;
  label: string;
};
const Select = ({ rates, setCurrency, htmlFor, label }: TSelect) => {
  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };
  return (
    <div className="w-full">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}:
      </label>
      <select
        onChange={(e) => handleCurrencyChange(e)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 "
      >
        {Object.keys(rates).map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

type TButton = { children: ReactNode; onClick: () => Promise<void> };
const Button = ({ onClick, children }: TButton) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-all"
    >
      {children}
    </button>
  );
};
