import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowAndId() {
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

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

  const navigate = useNavigate();
  const [values] = useState({
    id: '', // Assuming you want to edit a student by ID
    // Add other fields if needed
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/Edit2/${values.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Add other fields if needed
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          // setRegisterStatus(data.message);
          navigate('/Edit2');
        } else {
          // setRegisterStatus("Concert created");
          console.log(data);
          navigate('/Edit2');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className='text-center center2'>
        <h5 className='colorw'>Students</h5>

        <div>
          <table className='table2'>
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

        <div className='pagination'>
          {Array.from({ length: Math.ceil(studentData.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`btn ${currentPage === i + 1 ? 'btn-success' : 'btn-warning'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <h3 className='colorw'>Edit Concert</h3>
        <div className='text-center'>
          <div>
            <button type='submit' onClick={handleSubmit} className='btn btn-success'>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowAndId;
