import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import DraggableSortTable from './DraggableSortTable.js'

async function fetchPeople() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const people = await response.json();
  return people;
}

export default function FilterablePeopleTable() {
  const [people, setPeople] = useState([]);
  const [nameSearched, setNameSearched] = useState("");
  const handleSearchChange = useDebouncedCallback((term) => {
    setNameSearched(term);
  }, 300);


  useEffect(() => {
    console.log('useEffect invoked')
    const fetchData = async () => {
        try {
            const people = await fetchPeople();
            setPeople(people);
          } catch (e) {
            console.log("Failed to fetch people with error", e);
          }
    }
    
    fetchData()
  }, []);

  function handleOnChange({ target: { value } }) {
    handleSearchChange(value);
  }


  const getFilteredPeople = () => {
    return people
    .filter((p) => {
      const nameLoweCase = p.name.toLowerCase();
      const searchStrLoweCase = nameSearched.toLowerCase();

      return nameLoweCase.startsWith(searchStrLoweCase);
    });
  };

  return (
    <>
      <Search onChange={handleOnChange} />
      {getFilteredPeople().length > 0 && (
        <DraggableSortTable people={getFilteredPeople()} />
      )}
    </>
  );
}

function Search({ onChange }) {
  return (
    <>
      <label
        htmlFor="search-by-name"
        style={{
          marginRight: "10px",
        }}
      >
        Search by name
      </label>
      <input
        id="search-by-name"
        type="text"
        name="search"
        placeholder="start typing..."
        onChange={onChange}
      />
    </>
  );
}
