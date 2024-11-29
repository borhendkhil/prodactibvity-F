import axios from 'axios';
const API_URL = 'http://localhost:8080/api/';
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL, '/task/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, '/task/create', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};



export const getCurrentUser = async () => {
  try {
    const response = await axios.get(API_URL + 'auth/getCurrentUser');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(API_URL + 'department/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const createDepartment = async (department) => {
  try {
    const response = await axios.post(API_URL + 'department/create', department);
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};
