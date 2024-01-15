import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useFetchDefects } from './hooks/fetchAllDefects';
import { BASE_URL } from './constants/baseUrl';
import LoadingOverlay from './components/Loading';

function App() {

  const { defects, loading, error } = useFetchDefects(`${BASE_URL}getAllDefects`);

  if (loading) return <LoadingOverlay 
    open={loading}
    title="Loading Defects"
  />
  if (error) return <div>Error: {error}</div>;

  console.log('DEFECTS: ', defects)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
