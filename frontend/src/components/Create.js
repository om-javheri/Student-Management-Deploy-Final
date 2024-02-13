import React, { useState } from "react";
// import db from './db';
import { useNavigate } from "react-router-dom";
import validation from './SignupValidation';

export default function Concert() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const err=validation(values);
    setErrors(err)
    if(err.name==="" && err.email==="" && err.password===""){
    fetch("http://localhost:8081/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate("/Created");
        } else {
          console.log(data);
          navigate("/Created");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

 
  return (
    <>
      <div className="flex">
        <form className="center2">
          <h3 className="colorw text-center"> New Student Registration</h3>

          <table className="table2">
            <thead className="tbody">
              <tr>
                <th>
                  {" "}
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mb-3 my-3 mx-3 "
                  >
                    Student Name
                  </label>
                </th>
                <th>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="name"
                    className=" my-2  "
                    id="Concert_Name"
                    placeholder="Enter Students Name"
                  />
                                {errors.name && <span className='text-danger'>{errors.name}</span>}

                </th>
              </tr>
              <tr>
                <th>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mb-3 my-3 mx-3"
                  >
                    Email
                  </label>
                </th>
                <th>
                  <input
                    type="email"
                    onChange={handleInput}
                    name="email"
                    className="my-2 mx-3 "
                    id="Team_Name"
                    placeholder="Enter Email"
                  />
                  {errors.email && <span className='text-danger'>{errors.email}</span>}
                </th>
              </tr>
              <tr>
                <th>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className=" mb-3 my-3 mx-3 "
                  >
                    Username
                  </label>
                </th>
                <th>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="username"
                    className=""
                    id="Ticket_Fee"
                    placeholder="Username"
                  />
                                {errors.name && <span className='text-danger'>{errors.name}</span>}

                </th>
              </tr>
              <tr>
                <th>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mb-3 my-3 mx-5"
                    type="date"
                  >
                    Password
                  </label>
                </th>
                <th>
                  <input
                    type="password"
                    onChange={handleInput}
                    name="password"
                    className="my-2 mx-1"
                    id="date"
                    placeholder="Enter Password"
                  />
                                {errors.password && <span className='text-danger'>{errors.password==="Password Invalid"?errors.password+" or username invalid":errors.password}</span>}

                </th>
              </tr>
            </thead>
            <tbody className="tbody"></tbody>
          </table>

          <div className="center2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
