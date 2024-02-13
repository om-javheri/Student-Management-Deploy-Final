const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
require("dotenv").config();
const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:`${process.env.MYSQLHOST}`,
    user:`${process.env.MYSQLUSER}`,
    password:`${process.env.MYSQLPASSWORD}`,
    database:`${process.env.MYSQLDATABASE}`,
    debug:true
});

app.post('/Signup', (req, res) => {
    
      const sql = "INSERT INTO signup (`name`, `email`, `password`) VALUES (?, ?, ?)";
      
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
      
      db.query(sql, [name,email,password], (err, data) => {
        if (data) {
          
          res.send(data);
          console.log("Data inserted successfully:", data);
        }
        else{
            res.send({message:"Error "})

        }
        
        
      });
   
  });

  app.post('/Login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM signup WHERE email=? AND password=?`;

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error("Error", err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (data.length > 0) {
                // User found, check admin status
                const user = data[0];
                if (user.admin_status === 1) {
                    console.log("Admin login successful");
                    res.send({ ...user, isAdmin: true });
                } else {
                    console.log("User login successful");
                    res.send({ ...user, isAdmin: false });
                }
            } else {
                res.status(401).json({ message: "Incorrect username or password" });
            }
        }
    });
});

app.post('/Create', (req, res) => {
    
  const sql = "INSERT INTO student(name ,email,username,password)VALUES(?,?,?,?)";
  
   
    const name=req.body.name;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;

   
  
  db.query(sql, [name,email,username,password], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.length>0){
          console.log("create succesful")
          res.send(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});

app.get('/Created', (req, res) => {
  const sql = "SELECT * FROM student WHERE id = (SELECT MAX(id) FROM student);";
  
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to retrieve data" });
    } else {
      if (data.length > 0) {
        console.log("Data retrieved successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});

app.get('/ShowAndId', (req, res) => {
  const sql = "SELECT * FROM student;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});

app.get('/ShowAndIdDown', (req, res) => {
  const sql = "SELECT * FROM student;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.get('/CheckAdmin', (req, res) => {
  const sql = "SELECT * FROM student;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});

app.post('/Edit2', (req, res) => {
    
  const sql = `UPDATE student SET  name=? ,email=?,username=?,password=? WHERE id=?;`;
  
   
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    
   
  
  db.query(sql, [name,email,username,password,id], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.affectedRows>0){
          console.log("create succesful")
          res.send(data)
          console.log(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});
app.post('/ShowAndDelete', (req, res) => {
  const sql = "DELETE FROM student WHERE id=?;";
  const id=req.body.id;
 
  
  db.query(sql,[id], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});




db.connect((err,values) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
    console.log('Connected to database!');
    app.listen(`${process.env.MYSQLPORT}`, () => {
      console.log("Server is listening on port 8081",values);
    });
  });
 
  