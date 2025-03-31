import { useState } from 'react'
import './App.css'
import Filter from "./components/Filter"
import Header from "./components/Header"
import Table from './components/Table'

function App() {

  const [filter, setFilter] = useState({name: "", minPrice: 0, maxPrice:100_00 });

  return (
    <div className="d-flex flex-column vh-100">
      <Header/>
      <div className="d-flex vh-100">
        <Filter filter={filter} onFiltersChange={setFilter}/>
        <Table filters={filter} columns={["Id", "Name", "Desc", "Cost", "Edit", "Delete"]}/>
      </div>
    </div>
  )
}

export default App
