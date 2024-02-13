import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Delete2() {
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/ShowAndId');
        const data = await response.json();
        if (Array.isArray(data)) {
          setStudentData(data);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setStudentData([]);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  
  return (
    <>
    <div className=' text-center'>
      

<div className='text-center center2'>
        <div>
          <table className="table2">
            <thead>
              <tr>
                <th>Student ID</th>
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
          {Array.from({ length: Math.ceil(studentData.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`btn ${currentPage === page ? 'btn-success' : 'btn-warning'}`}
            >
              {page}
            </button>
          ))}
        </div>
<h3 className='colorw'>Concert Deleted</h3>
</div>
<div className='text-center'>


<div><Link to="/ShowAndDelete"><button className='btn btn-success'>Back</button></Link>
</div>
</div>



    </div>
    </>
  )
}
export default Delete2;

