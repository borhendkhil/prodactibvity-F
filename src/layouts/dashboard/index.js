/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import  axios  from 'axios';

const initialTasks = {
  upcoming: [
    { id: '1', title: 'Task 1: Prepare report', date: '2024-12-01', assignedTo: 'John Doe', profilePic: '', departmentId: 'Dept 1', creatorId: 'User 1', status: 'upcoming', priority: 'high' },
    { id: '2', title: 'Task 2: Team meeting', date: '2024-12-02', assignedTo: 'Jane Smith', profilePic: '', departmentId: 'Dept 2', creatorId: 'User 2', status: 'inProgress', priority: 'medium' },
  ],
  inProgress: [
    { id: '3', title: 'Task 3: Code review', date: '2024-12-03', assignedTo: 'John Doe', profilePic: '', departmentId: 'Dept 1', creatorId: 'User 3', status: 'inProgress', priority: 'low' },
  ],
  done: [
    { id: '4', title: 'Task 4: Finish testing', date: '2024-12-04', assignedTo: 'Jane Smith', profilePic: '', departmentId: 'Dept 2', creatorId: 'User 4', status: 'done', priority: 'high' },
  ],
};





export const getUsers = async (depId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/Department/getUsersbyDepartment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ departmentId: depId }),
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch users: ", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
};

export const getAllDepartments = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/Department/getAllDepartments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data; // Return the department data directly
    } else {
      console.error("Failed to fetch departments: ", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return [];
  }
};
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL + 'auth/getCurrentUser', {
      headers: {
      Authorization: `Bearer ${token}`
      }
    });

    return response.data;
    console.log(response.data)
    
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

function Dashboard() {
  
  const [departments,setDepartments]=useState([])
  const [tasks, setTasks] = useState(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [users,setUsers] = useState (["john","doe"]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: [],
    creatorId: '',
    departmentId: '',
    
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  const handleOpenDialog = (task = null, column = '') => {
    if (task) {
      setSelectedTask(task);
    } else {
      setSelectedTask(null);
    }

    setNewTask({
      ...newTask,
      
      status: column,
      createdAt: task ? task.createdAt : new Date().toISOString(),
      updatedAt: task ? task.updatedAt : new Date().toISOString(),
      title: task ? task.title : '',
      description: task ? task.description : '',
      assigneeId: task ? task.assigneeId : [""],
      creatorId: task ? task.creatorId : '',
      departmentId: task ? task.departmentId : '',
      priority: task ? task.priority : '',
      dueDate: task ? task.dueDate : '',
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewTask({
      title: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assigneeId: [""],
      creatorId: getCurrentUser().id,
      departmentId: '',
      
    });
  };

  const selectDepartment = (depId) => {
    setUsers(getUsers(depId));
    setNewTask({ ...newTask, departmentId: depId });
    
  };


  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getAllDepartments();
      console.log(data)
      setDepartments(data);
    };

    fetchDepartments();
  
  }, []);

  const handleAddTask = async () => {
    const newTaskWithTimestamps = {
      ...newTask,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/task/createTask', {

        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
          },
        body: JSON.stringify(newTaskWithTimestamps),
      });
      console.log(newTaskWithTimestamps)

      if (response.ok) {
        const createdTask = await response.json();
        const updatedTasks = [...tasks[newTask.column], createdTask];
        setTasks({ ...tasks, [newTask.column]: updatedTasks });
        handleCloseDialog();
      } else {
        console.error('Erreur lors de la création de la tâche');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            {Object.keys(tasks).map((column) => (
              <Grid item xs={12} md={4} key={column}>
                <MDBox
                  mb={2}
                  sx={{
                    backgroundColor:
                      column === 'upcoming'
                        ? '#efe3e7'
                        : column === 'inProgress'
                        ? '#c9d0f1'
                        : '#c8e6c9',
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color={column === 'upcoming' ? 'primary' : column === 'inProgress' ? 'info' : 'success'}
                    fontWeight="bold"
                  >
                    {column === 'upcoming' && (
                      <>
                        <Icon sx={{ mr: 1 }}>schedule</Icon> Upcoming
                      </>
                    )}
                    {column === 'inProgress' && (
                      <>
                        <Icon sx={{ mr: 1 }}>hourglass_empty</Icon> In Progress
                      </>
                    )}
                    {column === 'done' && (
                      <>
                        <Icon sx={{ mr: 1 }}>check_circle</Icon> Done
                      </>
                    )}
                  </Typography>

                  <Droppable droppableId={column}>
                    {(provided) => (
                      <MDBox
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          minHeight: '150px',
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        {tasks[column].map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  mb: 2,
                                  p: 2,
                                  boxShadow: 3,
                                  borderRadius: 2,
                                  backgroundColor: '#fff',
                                  border: '1px solid #000',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                  },
                                }}
                                onClick={() => handleOpenDialog(task)}
                              >
                                <Typography variant="body2" sx={{ color: '#333' }}>
                                  {task.title}
                                </Typography>
                                <MDBox display="flex" alignItems="center" sx={{ mt: 1 }}>
                                  <AccessTimeIcon sx={{ mr: 1 }} />
                                  <Typography variant="caption" color="textSecondary" sx={{ mr: 2 }}>
                                    {task.date}
                                  </Typography>
                                  <Avatar alt={task.assignedTo} src={task.profilePic} sx={{ width: 24, height: 24, mr: 1 }} />
                                  <Typography variant="caption" color="textSecondary">
                                    {task.assignedTo}
                                  </Typography>
                                </MDBox>

                                <MDBox display="flex" flexDirection="column" sx={{ mt: 2 }}>
                                  <Typography variant="caption" color="textSecondary">
                                    <strong>Department ID:</strong> {task.departmentId || 'Non spécifié'}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    <strong>Creator ID:</strong> {task.creatorId || 'Non spécifié'}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    <strong>Priority:</strong> {task.priority}
                                  </Typography>
                                </MDBox>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </MDBox>
                    )}
                  </Droppable>

                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenDialog(null, column)}
                  >
                    Ajouter une tâche
                  </Button>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </MDBox>

      {/* Dialog pour ajouter/modifier une tâche */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedTask ? 'Modifier la tâche' : 'Ajouter une tâche'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Titre"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ height: 50, mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            sx={{ height: 50, mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              sx={{ height: 50, mb: 2 }}
            >
              <MenuItem value="upcoming">À venir</MenuItem>
              <MenuItem value="inProgress">En cours</MenuItem>
              <MenuItem value="done">Terminé</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Priorité"
            fullWidth
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            sx={{ height: 50, mb: 2 }}
          />
          <TextField
            label="Date limite"
            type="date"
            fullWidth
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            sx={{ height: 50, mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
         
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={newTask.departmentId || ''}
              onChange={(e) => selectDepartment(e.target.value)}
              sx={{ height: 50, mb: 2 }}
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {newTask.departmentId && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Assigné à</InputLabel>
              <Select
                value={newTask.assigneeId[0] || ''}
                onChange={(e) => setNewTask({ ...newTask, assigneeId: [e.target.value] })}
                sx={{ height: 50, mb: 2 }}
              >
                {users.map((user, index) => (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
      
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
          <Button onClick={handleAddTask} color="primary">{selectedTask ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Dashboard;
