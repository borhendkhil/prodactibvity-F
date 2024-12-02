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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const initialTasks = {
  upcoming: [
    { id: '1', title: 'Task 1: Prepare report', date: '2024-12-01', assignedTo: 'John Doe', profilePic: 'https://www.example.com/johndoe.jpg' },
    { id: '2', title: 'Task 2: Team meeting', date: '2024-12-02', assignedTo: 'Jane Smith', profilePic: 'https://www.example.com/janesmith.jpg' },
  ],
  inProgress: [
    { id: '3', title: 'Task 3: Develop feature', date: '2024-12-03', assignedTo: 'Mark Johnson', profilePic: 'https://www.example.com/markjohnson.jpg' },
    { id: '4', title: 'Task 4: Debug issues', date: '2024-12-04', assignedTo: 'Emily Davis', profilePic: 'https://www.example.com/emilydavis.jpg' },
  ],
  done: [
    { id: '5', title: 'Task 5: Code review', date: '2024-12-05', assignedTo: 'Lucas Brown', profilePic: 'https://www.example.com/lucasbrown.jpg' },
    { id: '6', title: 'Task 6: Deploy to staging', date: '2024-12-06', assignedTo: 'Sophia Taylor', profilePic: 'https://www.example.com/sophiataylor.jpg' },
  ],
};

const users = [
  { name: 'John Doe', profilePic: 'https://www.example.com/johndoe.jpg' },
  { name: 'Jane Smith', profilePic: 'https://www.example.com/janesmith.jpg' },
  { name: 'Mark Johnson', profilePic: 'https://www.example.com/markjohnson.jpg' },
  { name: 'Emily Davis', profilePic: 'https://www.example.com/emilydavis.jpg' },
  { name: 'Lucas Brown', profilePic: 'https://www.example.com/lucasbrown.jpg' },
  { name: 'Sophia Taylor', profilePic: 'https://www.example.com/sophiataylor.jpg' },
];

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    date: '',
    assignedTo: '',
    profilePic: '',
  });

  const handleOpenDialog = (column) => {
    setCurrentColumn(column);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTask({ title: '', date: '', assignedTo: '', profilePic: '' });
  };

  const handleAddTask = () => {
    const updatedTasks = {
      ...tasks,
      [currentColumn]: [
        ...tasks[currentColumn],
        {
          id: String(Date.now()), // Unique ID for the task
          ...newTask,
        },
      ],
    };

    setTasks(updatedTasks);
    handleCloseDialog();
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

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
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                  },
                                }}
                              >
                                <Typography variant="body2" sx={{ color: '#333' }}>
                                  {task.title}
                                </Typography>

                                <MDBox display="flex" alignItems="center" sx={{ mt: 1 }}>
                                  <AccessTimeIcon sx={{ mr: 1 }} />
                                  <Typography variant="caption" color="textSecondary" sx={{ mr: 2 }}>
                                    {task.date}
                                  </Typography>
                                  <Avatar
                                    alt={task.assignedTo}
                                    src={task.profilePic}
                                    sx={{ width: 24, height: 24, mr: 1 }}
                                  />
                                  <Typography variant="caption" color="textSecondary">
                                    {task.assignedTo}
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
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenDialog(column)}
                  >
                    + Ajouter Task
                  </Button>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </MDBox>

      {/* Dialog pour ajouter une nouvelle tâche */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titre"
            margin="dense"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Date"
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
          <Select
            fullWidth
            value={newTask.assignedTo}
            onChange={(e) => {
              const selectedUser = users.find((user) => user.name === e.target.value);
              setNewTask({ ...newTask, assignedTo: selectedUser.name, profilePic: selectedUser.profilePic });
            }}
            displayEmpty
            margin="dense"
          >
            <MenuItem value="" disabled>
              Sélectionner une personne
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.name} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Dashboard;
