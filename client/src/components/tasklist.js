import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function TaskList(){
    
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const LoadTask = async ()=>{
        const response = await fetch('http://localhost:3001/')
        const data = await response.json();
        setTasks(data);
    }


    
    const handleDelete = async (id)=>{
        try {
            await fetch(`http://localhost:3001/${id}`,{
                method: 'DELETE'
            });
            //de tasks filtre y mantenga los id diferentes al id eliminado y 
            //lo vuelve a setear en el arreglo de las tareas.
            setTasks(tasks.filter( task => task.id !== id ));
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        LoadTask();
    }, []);
    return (
        <>
            <h1 style={{ color: 'white' }}>Task List</h1>
            {
                tasks.map((task) =>(
                        <Card style={{
                            marginBottom: '.7rem',
                            backgroundColor: '#1e272e'
                        }}
                         key={ task.id }>
                            <CardContent style={{
                                display: 'flex',
                                justifyContent: 'space-between' 
                            }}>
                                <div style={{ color: 'white'}}>
                                    <Typography>{ task.titulo }</Typography>
                                    <Typography>{ task.descripcion }</Typography>
                                </div>
                                
                                <div>
                                    <Button variant="contained" 
                                            color="inherit" 
                                            onClick={()=>{ navigate(`/tasks/${ task.id }/edit`) }}
                                            style={{ marginLeft: '.5rem' }}>
                                        EDIT
                                    </Button> 
                                    <Button variant="contained" 
                                            color="warning" 
                                            onClick={()=>{ handleDelete( task.id ) }}
                                            style={{ marginLeft: '.5rem'}}>
                                        DELETE
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                )
            }
        </>
    )
  };