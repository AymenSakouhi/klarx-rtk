import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import { RootState } from "./app/store";
import { useCurrencyQuery } from "./services/currencyApi";
import { useDispatch, useSelector } from "react-redux";
import { addRate, clearState } from "./features/exchangeSlice";
import {
  addRateReverse,
  clearStateReverse,
} from "./features/reverseExchangeSlice";
import { formatDate, getData } from "./services/controllers";
import NavBar from './components/NavBar'
import LineChart from './components/LineChart'

let d: any = new Date();

function App() {
  const exchanges = useSelector((state: RootState) => state.exchanges.value);
  const reverseExchanges = useSelector(
    (state: RootState) => state.reverseExchanges.value
  );
  const dispatch = useDispatch();
  const [tableReady, setTableReady] = useState<boolean>(false);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");

  const { data, error, isLoading, isSuccess } = useCurrencyQuery({
    from: "EUR",
    to: "USD",
    date: "today",
  });

  const fillIn = (b: string, t: string) => {
    d = new Date();
    for (let index = 1; index <= 14; index++) {
      getData(b, t, formatDate(d.setDate(d.getDate() - 1))) //to change later - to 1
        .then((res) => res.json())
        .then((apiData) => {
          dispatch(addRate(apiData.info.rate));
        })
        .catch(console.error)
        .finally(() => setTableReady(true));

      getData(t, b, formatDate(d))
        .then((res) => res.json())
        .then((apiData) => {
          dispatch(addRateReverse(apiData.info.rate));
        })
        .catch(console.error)
        .finally(() => setTableReady(true));
    }
  };

  useEffect(() => {
    if (!tableReady) {
      fillIn(baseCurrency, toCurrency);
    }
  }, [baseCurrency]);

  return (
    <>
      <NavBar />
      
      {isLoading && <h2>...Loading</h2>}
      {error && <h2>Something is wrong!!!</h2>}
      {isSuccess && (
        <Container className="text-center">
        <Row>
        <h1>Below are the list of currencies</h1>
        <Col md={6} sm={12} className="mb-2 d-flex justify-content-around h5">
          
          <label htmlFor="currencyfrom">Select the 'BASE' currency that you want to convert from:</label>
          
          
          <select
              name="currencyfrom"
              id="currencyfrom"
              onChange={(e) => {
                dispatch(clearState());
                dispatch(clearStateReverse());
                setBaseCurrency(e.target.value);
                fillIn(e.target.value, toCurrency);
              }}
            >
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
              <option value="USD">USD</option>
            </select>
         
            
        </Col>
        <Col md={6} sm={12} className="mb-2 d-flex justify-content-around h5">
        <label htmlFor="name">Select the 'TO' currency that you want to convert to: </label>
            <select
              name="currencyto"
              id="currencyto"
              onChange={(e) => {
                dispatch(clearState());
                dispatch(clearStateReverse());
                setToCurrency(e.target.value);
                fillIn(baseCurrency, e.target.value);
              }}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
            </select>
        </Col>

            
        </Row>
        <Row className="mx-2">
          <Col md={6} sm={12} className="mb-2">
          <h2>{baseCurrency} to {toCurrency} rates in the last 14 days:</h2>
            {exchanges?.map((rate, index) => (
              <div key={index}>
                Day {0-index} : {rate} {toCurrency}
              </div>
            ))}
          <button
            onClick={() => {
              dispatch(clearState());
            }}
          >
            Clear
          </button>
          </Col>
          <Col md={6} sm={12} className="mb-2">
            
              <h2>{toCurrency} to {baseCurrency} in the last 14 days:</h2>
              {reverseExchanges.map((rate, index) => (
                <div key={index}>
                 Day {0-index} : {rate} {baseCurrency}
                </div>
              ))}
            <button
              onClick={() => {
                dispatch(clearStateReverse());
              }}
            >
              Clear
            </button>
          </Col>
        </Row>
        <Row md={12}>
          <hr />
          <LineChart />
        </Row>

      </Container>
      )}
    </>
  );
}

export default App;
