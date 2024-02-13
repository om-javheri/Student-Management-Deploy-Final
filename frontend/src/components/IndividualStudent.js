import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function IndividualStudent() {
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
  const [searchedId, setSearchedId] = useState('');
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems2 = concertData2.slice(indexOfFirstItem, indexOfLastItem);


    const singleSearch = () => {
      const filteredData = concertData.filter((student) => student.id === parseInt(searchedId));
      
      setConcertData2(filteredData);
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8081/ShowAndIdDown');
          
          
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



<div>
        <div>
        <h6 className='colorw'>Search Student </h6>
        <div>
          <input type="number" className='border'  onChange={(e) => setSearchedId(e.target.value)} placeholder="Enter Student ID" />
          <button type="button" className='button border' onClick={singleSearch}>Search</button>
        </div>
       
        </div>
        
</div>



    </div>
    <div className='text-center center2'>
  <table className="table2 ">
    <tbody >
      {currentItems2.map((student, index) => (
        <React.Fragment key={index}>
          <tr >
            <td className='td'>Student ID</td>
            <td>{student.id}</td>
          </tr>
          <tr>
            <td className='td'>Student Name</td>
            <td>{student.name}</td>
          </tr>
          <tr>
            <td className='td'>Student Email</td>
            <td>{student.email}</td>
          </tr>
          <tr>
            <td className='td'>Student Username</td>
            <td>{student.username}</td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
  <Link className='btn btn-success' to="/ShowAndBook">Back</Link>

</div>



        </>
      
  )
}
export default IndividualStudent;

