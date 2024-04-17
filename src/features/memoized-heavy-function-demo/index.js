import { v4 as uuidv4 } from 'uuid';
import { useMemo, useState } from 'react';

import './styles.css';

export default function Container() {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div>
      <SearchField
        labelText="Provide dynamic dependency"
        value={inputValue}
        onChange={handleInputChange}
      />
      <HeavyComponent dependency="air" dynamicDependency={inputValue} />
      <OptimizedHeavyComponent dependency="air"  dynamicDependency={inputValue} />
    </div>
  );
}

function HeavyComponent({ dependency, dynamicDependency }) {
  const content = produceContent(dependency);

  return (
    <div style={{border: '1px solid red', margin: '50px'}}>
      <h3>{dynamicDependency}</h3>
      {content.slice(0, 5).map((item) => {
        return (<p key={item.id}>{JSON.stringify(item)}</p>)
      })}
    </div>
  );
}

function OptimizedHeavyComponent({ dependency, dynamicDependency }) {
  const content = useMemo(() => {
    const a = 'Memoized';
    return produceContent(dependency, a);
  }, [dependency]);

  return (
    <div style={{border: '1px solid green', margin: '50px'}}>
      <h3>{dynamicDependency}</h3>
      {content.slice(0, 5).map((item) => {
        return (<p key={item.id}>{JSON.stringify(item)}</p>)
      })}
    </div>
  );
}


function produceContent(dependency, a) {
  const text = a === "Memoized" ? `produceContent for ${a}` : "produceContent";

  console.time(text)

  const amount = 10000;
  const arr = [];

  for (let i = 0; i < amount; i++) {
    const obj = {
      id: uuidv4(),
      dependency: dependency
    };

    arr.push(obj);
  }

  console.timeEnd(text);

  return arr;
}

function SearchField({labelText, value, onChange}) {
  return (
    <div>
      <label htmlFor='search-field' style={{marginRight: '20px'}}>
        {labelText}
      </label>
      <input
        id='search-field'
        name='input-field'
        type='text'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
