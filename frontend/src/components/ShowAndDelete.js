import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowAndDelete() {
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
  const [values, setValues] = useState({
    id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/ShowAndDelete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: values.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate('/Delete2');
        } else {
          console.log(data);
          navigate('/Delete2');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <div className='text-center'>
        <h4 className='colorw'>Delete Student</h4>

        <div className='center2'>
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
        </div>

        <div className='text-center'>
          <label htmlFor='exampleFormControlInput1 ' className='form-label mb-3 my-3 mx-3 colorw'>
            Student Registration Id
          </label>
          <input
            type='number'
            onChange={handleInput}
            className=''
            name='id'
            placeholder='Student ID to Delete'
            id='id'
          />

          <div>
            <button type='submit' onClick={handleSubmit} className='btn btn-success'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowAndDelete;
