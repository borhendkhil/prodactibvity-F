// Import axios ou fetch selon vos préférences
import axios from 'axios';

const API_BASE_URL = 'localhost:8080/api/task';

// Créer une tâche
export async function createTask(newTask) {
  try {
    const response = await axios.post(`${API_BASE_URL}/createTask`, newTask);
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error);
    throw error;
  }
}

// Mettre à jour une tâche existante
export async function updateTask(taskId, updatedTask) {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateTask`, { id: taskId, ...updatedTask });
    return response.data; 
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    throw error;
  }
}

// Récupérer toutes les tâches
export async function getTasks() {
  try {
    const response = await axios.get(`${API_BASE_URL}/Tasks`);
    return response.data; // Renvoie la liste des tâches
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    throw error;
  }
}

// Supprimer une tâche
export async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteTask`, { data: { id: taskId } });
    return response.data; // Renvoie un statut ou une confirmation
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    throw error;
  }
}
