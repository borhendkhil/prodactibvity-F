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

const initialTasks = {
  upcoming: [
    { id: '1', title: 'Task 1: Prepare report', date: '2024-12-01', assignedTo: 'John Doe', profilePic: '' },
    { id: '2', title: 'Task 2: Team meeting', date: '2024-12-02', assignedTo: 'Jane Smith', profilePic: '' },
  ],
  inProgress: [
    { id: '3', title: 'Task 1: Prepare report', date: '2024-12-01', assignedTo: 'John Doe', profilePic: '' },
    { id: '4', title: 'Task 2: Team meeting', date: '2024-12-02', assignedTo: 'Jane Smith', profilePic: '' },
  ],
  done: [{ id: '5', title: 'Task 1: Prepare report', date: '2024-12-01', assignedTo: 'John Doe', profilePic: '' },
    { id: '6', title: 'Task 2: Team meeting', date: '2024-12-02', assignedTo: 'Jane Smith', profilePic: '' },],
};

const users = ['John Doe', 'Jane Smith', 'Mark Johnson', 'Emily Davis'];

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', assignedTo: '', column: '' });

  // Gestion du drag-and-drop
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

  // Ouverture de la boîte de dialogue
  const handleOpenDialog = (column) => {
    setNewTask({ ...newTask, column });
    setDialogOpen(true);
  };

  // Fermeture de la boîte de dialogue
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewTask({ title: '', date: '', assignedTo: '', column: '' });
  };

  // Ajout d'une nouvelle tâche
  const handleAddTask = () => {
    const column = newTask.column;
    const newId = `${Date.now()}`; // Génération d'un ID unique
    const updatedTasks = [...tasks[column], { ...newTask, id: newId }];
    setTasks({ ...tasks, [column]: updatedTasks });
    handleCloseDialog();
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
                    color={
                      column === 'upcoming'
                        ? 'primary'
                        : column === 'inProgress'
                        ? 'info'
                        : 'success'
                    }
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
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
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
                    sx={{
                      mt: 2,
                      backgroundColor: '#1a73e8',
                      color: '#fff',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#fff',
                        color: '#1a73e8',
                      },
                    }}
                    onClick={() => handleOpenDialog(column)}
                  >
                    + Ajouter Task
                  </Button>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>

        {/* Boîte de dialogue pour ajouter une tâche */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Ajouter une tâche</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Titre de la tâche"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="assign-to-label">Assigner à</InputLabel>
              <Select
                labelId="assign-to-label"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1a73e8',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1a73e8',
                  },
                }}
              >
                {users.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleAddTask} variant="contained" color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
