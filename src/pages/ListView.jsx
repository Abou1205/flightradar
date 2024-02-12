import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactPaginate from 'react-paginate'

const ListView = ({openModal}) => {
  const state = useSelector((store) => store.flightSlice)


  // first element calculate
  const [itemOffset, setItemOffset] = useState(0);

  // items per page
  const itemsPerPage = 10

  // last element
  const endOffset = itemOffset + itemsPerPage;

  // data slice 
  const currentItems = state.flights.slice(itemOffset, endOffset);

  // total page
  const pageCount = Math.ceil(state.flights.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage)
    setItemOffset(newOffset);
  };



  return (
    <div className='p-4'>
      <table className='table table-dark table-hover mt-5 table-responsive'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((i,index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>{i.code}</td>
              <td>{i.lat}</td>
              <td>{i.lng}</td>
              <td>
                <button onClick={() => openModal(i.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        className='pagination'
      />
    </div>
  )
}

export default ListView