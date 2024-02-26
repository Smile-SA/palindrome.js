import { useEffect, useState } from 'react';
import Palindrome from './Palindrome';
import { getData } from './useCaseExample';

function App() {
  const [dataStructure, setDataStructure] = useState({});
  const [config, setConfig] = useState({});

  useEffect(() => {
    const data = getData();
    setDataStructure(data);
    setConfig({
      displayGrid: false
    });
  }, []);

  return (
    <div className="App">
      <Palindrome dataStructure = {dataStructure} config = {config} />
    </div>
  );
}

export default App;
