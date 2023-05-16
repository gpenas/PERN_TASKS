import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';
import NavBar from './components/navbar';
import { Container } from '@mui/material';
export default function App(){
  return (
    <BrowserRouter>
      <NavBar/>
      <Container>
        <Routes>
          <Route path="/" element={ <TaskList/> }/>
          <Route path="/tasks/new" element={ <TaskForm/> }/>
          <Route path="/tasks/:id/edit" element={ <TaskForm/> }/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
};
