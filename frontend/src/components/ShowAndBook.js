import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

function ShowAndBook() {
  const [concertData, setConcertData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/ShowAndId');
        const data = await response.json();
        if (Array.isArray(data)) {
          setConcertData(data);
        } else {
          setConcertData([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setConcertData([]);
      }
    };
    fetchData();
  }, []);
  const [concertData2, setConcertData2] = useState([]);
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = concertData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems2 = concertData2.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8081/ShowAndIdDown');
          const data = await response.json();
          
        } catch (error) {
          console.error('Error:', error);
          
        }
      };
      fetchData();
    }, []);
  


  return (
    <>
    <div className=' text-center top'>


<div>
  
</div>

<h5 className='colorw'>All Students List</h5>
<div className='text-center table-box center2 '>
<div >
          <table className="table2">
            <thead >
              <tr >
                <th >Student ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Student Username</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {currentItems.map((student, index) => (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {Array.from({ length: Math.ceil(concertData.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button  key={page} onClick={() => paginate(page)} className={`btn ${currentPage === page ? 'btn-success' : 'btn-warning'}`}>
              {page}
            </button>
          ))}
        </div>


 


        <div className='display'>
        <h6 className='colorw m-3  me-7 '>Search Student </h6>
        <h6 className='colorw m-3 me-5'> Edit Student </h6>
          
         
        </div>
        <div className='display'>
        <Link className='btn btn-success me-3  mx-5 ' to="/IndividualStudent">Search</Link>
         <Link className='btn btn-success  mx-5 ' to="/Edit2">Edit</Link>
         </div>
        
</div>


</div>

        </>
      
  )
}
export default ShowAndBook;

