import React, { useState, useEffect } from 'react';

export default function Created() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/Created');
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

  return (
    <>

      
      <div className='text-center center2'>
      <h2 className='colorw'>New Student added</h2>
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
      {studentData.map((student, index) => (
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

    </>
  );
}
