import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {
  // form state
  const [quest, updateQuest] = useState({
    city: '',
    country: ''
  });

  const [consult, saveConsult] = useState(false);
  const [result, saveResult] = useState({});
  const [error, saveError] = useState(false);

  const { city, country } = quest;

  useEffect(() => {
    if (consult) {
      const questApi = async () => {

        const appId = '8b64095c39f0636f91aa17e0a6681266';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
        const responsse = await fetch(url);
        const result = await responsse.json();
        saveResult(result);
        saveConsult(false);

        // detect if there's an error
        if (result.cod === '404') {
          saveError(true);
        } else {
          saveError(false);
        }
      }

      questApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consult]);

  let component;
  // conditional loading of components
  // if exist an error show alert
  if (error) {
    component = <Error message="There aren't Results" />
  } else {
    component = <Weather result={result} />;
  }

  return (
    <Fragment>
      <Header
        title='Weather React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                quest={quest}
                updateQuest={updateQuest}
                saveConsult={saveConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
