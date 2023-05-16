import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm(){

    const navigate = useNavigate();
    const params   = useParams();

    const [ task, setTask] = useState({
        titulo: '',
        descripcion: ''
    });
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const LoadTask = async (id)=>{
        const response = await fetch(`http://localhost:3001/${id}`)
        const data = await response.json();
        setTask({ 
                  titulo: data.titulo, 
                  descripcion: data.descripcion 
                });
        setEditing(true);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        if(editing){
            await fetch(`http://localhost:3001/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            });
        }else{
            await fetch('http://localhost:3001/', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            });
        }
        //const data = await response.json();
        setLoading(false);
        navigate('/')
    }

    const handleChange = (e) =>
        setTask({ ...task, [e.target.name]: e.target.value })
    
    useEffect(()=>{
        if(params.id){
            LoadTask(params.id);
        }
    },[params.id]);

    return (
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item xs={3}>
            <Card sx={{mt: 5}} style={{
                backgroundColor: '#1e272e',
                padding: '1rem'
            }}>
                <Typography variant='5' textAlign='center' color='white'>
                    { editing ? "Edit Task" : "Create Task" }
                </Typography>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant = 'filled'
                            label   = 'Ingrese el título'
                            sx = {{
                                display: 'block',
                                margin: '.5rem 0'
                            }}
                            onChange={handleChange}
                            name = 'titulo'
                            value={ task.titulo }
                            inputProps={{style: {color:"white"}}}
                            InputLabelProps={{style: {color:"white"}}}
                        />

                        <TextField
                            variant = 'filled'
                            label   = 'Ingrese la descripción'
                            multiline
                            rows={4}
                            sx = {{
                                display: 'block',
                                margin: '.5rem 0'
                            }}
                            onChange={handleChange}
                            name = 'descripcion'
                            value={ task.descripcion }
                            inputProps={{style: {color:"white"}}}
                            InputLabelProps={{style: {color:"white"}}}
                        />
                        <Button variant='contained' color='primary' type='submit' disabled={ !task.titulo || !task.descripcion }>
                            { loading ? (<CircularProgress color='inherit' size={24}/>):("Guardar")}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    )
  };