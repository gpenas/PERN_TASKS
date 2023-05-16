const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const taskRouter = require("./routes/tasks.routes")

const app = express();
//para poder interconectar con el servidor de front-end
app.use(cors());
//para ver las peticiones por consola.
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRouter);
app.use((err, req, res, next)=>{
    return res.json({ message: err.message });
})
app.listen(3001);



console.log("Server on port 3001")