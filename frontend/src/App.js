import React,{ useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import ShowNavbar from './components/ShowNavbar';
import Delete2 from './components/Delete2';
import ShowAndBook from './components/ShowAndBook';
 import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Create from './components/Create';
  import Edit2 from './components/Edit2';
 import Created from './components/Created';
import ShowAndId from './components/ShowAndId';
import ShowAndDelete from './components/ShowAndDelete';
 import NavbarLimit from './components/NavbarLimit';
import IndividualStudent from './components/IndividualStudent';
import Show from './components/Show';
 document.body.style.backgroundColor='white'

export default function App() {
  const [loginStatus, setloginStatus] = useState(true);
  

  

   
    

    

  return (
    <>


    
        <Router>
<ShowNavbar>
  {!loginStatus?<NavbarLimit  navbar_item1="Student Information" navbar_item2="Register"/>:<Navbar  navbar_item1="Student Information" navbar_item2="Register"  navbar_item3="Edit" navbar_item4="Delete" />
}


</ShowNavbar>


            
    <div className="container my-3"  >
    <Routes>
       <Route exact path="/" element={<Textform  loginStatus={loginStatus} setloginStatus={setloginStatus} />}/>
       <Route exact path="/Show" element={<Show/>}/>

 <Route exact path="/Create" element={<Create/>}/>
 <Route exact path="/Edit2" element={<Edit2/>}/>
 <Route path="/Created" element={<Created/>}/>
<Route path='/ShowAndId' element={<ShowAndId/>}/>
<Route path='/ShowAndDelete' element={<ShowAndDelete/>}/>
<Route path='/Delete2' element={<Delete2/>}/>
 
 
<Route path='/ShowAndBook' element={<ShowAndBook/>}/>

<Route path='/IndividualStudent' element={<IndividualStudent/>}/>
 
    </Routes>
    
  

   </div>
  </Router>

    
    </>
  )
}
