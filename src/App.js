import './App.css';
import {useEffect, useState} from 'react'
import Axios from 'axios'
import Coin from './components/Coin'


function App() {
  const [listOfcoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit").then(
      (response) => {
        setListOfCoins(response.data.coins);
    })
  }, [])

  const filteredCoins = listOfcoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  return (
    <div className="App">
        <div className="cryptoHeader">
          <input type="text" placeholder="Bitcoin... " onChange={(event) => 
          setSearchWord(event.target.value)
          }/>
        </div>
        <div className="cryptoDisplay">
          {filteredCoins.map((coin) => {
            return <Coin name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol} />;
          })}
        </div>
    </div>
  );
}

export default App;
