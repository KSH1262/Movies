import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [need, setNeed] = useState(1);
  const onChange = (event) => {
    setCost(event.target.value);
    setNeed(1);
  };
  const onInput = (event) => {
    setNeed(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `: ${coins.length}`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          <option>Coin</option>
          {coins.map((coin, index) => (
            <option value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      {loading ? (
        ""
      ) : (
        <div>
          <input
            onChange={onInput}
            value={need}
            type="number"
            placeholder="Your money"
          />
          <h3>You con get coin : {need / cost}</h3>
        </div>
      )}
    </div>
  );
}
 
export default App;

