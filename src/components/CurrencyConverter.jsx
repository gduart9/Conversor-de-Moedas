import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);

  const API_KEY = '9fc9acca045ad519df413aa3';
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
        setRate(data.conversion_rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount((amount * rate).toFixed(2));
  }, [rate, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter">
      <h1>Conversor de Moedas🪙</h1>

      <div className="input-section">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button onClick={handleSwapCurrencies}>↔️</button>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="result">
        <h2>Valor Convertido:</h2>
        <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
