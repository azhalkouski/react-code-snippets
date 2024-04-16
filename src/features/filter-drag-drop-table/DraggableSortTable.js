import { useEffect, useState } from "react";

export default function DraggableSortTable({ people }) {
  const [items, setItems] = useState(people);

  useEffect(() => {
    setItems(people)
  }, [people]);


  function sortOnDrop(prevPosition, nextPosition) {
    const prevPostionNum = parseInt(prevPosition);
    const nextPostionNum = parseInt(nextPosition);
    
    const theItem = items[prevPosition];
    // cut out from original list
    const itemsWithoutTheItem = [...items.slice(0, prevPostionNum), ...items.slice(prevPostionNum + 1)];

    // insert into new list at postion nextPosition
    const reorderedItems = [...itemsWithoutTheItem.slice(0, nextPostionNum), {...theItem}, ...itemsWithoutTheItem.slice(nextPostionNum)];

    setItems(reorderedItems);
  }

  return (
    <div style={{ margin: "20px", border: "1px solid red" }}>
      {items.map((person, index) => (
        <DraggableItem
          key={person.id}
          item={person.name}
          position={index}
          onDrop={sortOnDrop}
        />
      ))}
    </div>
  )
}


function DraggableItem({ item, position, onDrop }) {

  function handleDrapStart(ev, startPosition) {
    console.log(startPosition);
    ev.dataTransfer.setData('elementDraggedAtPosition', startPosition);
  }

  function handleDragOver(e) {
    e.preventDefault(); // for some reason this line is necessary
    console.log('handleDragOver');
  }

  function handleDrop(e, nextPosition) {
    const prevPostion = e.dataTransfer.getData('elementDraggedAtPosition');
    if (prevPostion !== nextPosition) {
      onDrop(prevPostion, nextPosition);
    }
  }

  return (
    <p
      draggable
      onDragStart={(e) => { handleDrapStart(e, position) }}
      onDragOver={handleDragOver}
      onDrop={(e) => { handleDrop(e, position) }}
    >{item}</p>
  );

}