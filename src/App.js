import FilterableTableContainer from './features/filter-drag-drop-table/FilterableTableContainer.js'
import SimpleDragDropComponent from './features/simple-drag-and-drop/SimpleDragDropComponent.js'
import featuresConfig from './features-config.json'
import "./styles.css";


export default function App() {
  const isSimpleDragAndDripEnabled = featuresConfig.SIMPLE_DRAD_AND_DROP.isEnabled;
  const isFilterableTableWithDragAndDropSortEnabled =
    featuresConfig.FILTERABLE_TABLE_WITH_DRAG_AND_DROP_SORT.isEnabled

  return (
    <div className="App">
      <h1>React code snippets</h1>
      {isFilterableTableWithDragAndDropSortEnabled && (
        <FilterableTableContainer />
      )}
      {isSimpleDragAndDripEnabled && (
        <SimpleDragDropComponent />
      )}
    </div>
  );
}
