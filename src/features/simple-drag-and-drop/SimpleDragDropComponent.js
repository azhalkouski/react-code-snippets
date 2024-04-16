import { useState } from 'react'
import "./styles.css";

const listOfOptions = [
  'Option A', 'Option B', 'Option C', 'Option D'
]

export default function SimpleDragDropComponent() {
  return (
    <div className="drag-and-drop-container">
      <h3>DragDropComponent</h3>
      <div className="drag-and-drop-container-main">
        <DraggableList />
        <DropZone />
      </div>
    </div>
  );
}


function DraggableList() {
  function handleDragStart(event, draggedElement) {
    event.dataTransfer.setData("draggedOption", draggedElement);
  }

  return (
    <div className='draggable-list-container'>
      <div>Draggable List</div>
      {
        listOfOptions.map((el, index) => {
          return (
            <div
              key={index}
              className='draggable-item'
              draggable
              onDragStart={(e) => handleDragStart(e, el)}
            >{el}</div>
          )
        })
      }
    </div>
  );
}


function DropZone() {
  const [itemsToRender, setItemsToRender] = useState([]);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    const newItem = e.dataTransfer.getData('draggedOption');
    setItemsToRender([...itemsToRender, newItem])
  }

  return (
    <div className='drop-zone-container'>
      <div className='drop-zone-header-container'>
        <h3>Drop Zone</h3>
      </div>
      <div
        className='drop-zone-area'
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        {
          itemsToRender.map((el, index) => {
            return (
              <div key={index} className='drop-zone-inner-item'>
                {el}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}