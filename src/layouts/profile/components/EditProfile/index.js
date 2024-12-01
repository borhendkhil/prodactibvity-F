import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MDBox from 'components/MDBox';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import Header from 'layouts/profile/components/Header';




import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL + 'auth/getCurrentUser', {
      headers: {
      Authorization: `Bearer ${token}`
      }
    });

    return response.data;
    
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};




// Material Dashboard 2 React components

// Material Dashboard 2 React example components

// Overview page components

// API

function EditProfile() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        status: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setFormData({
                username: currentUser.username,
                bio: currentUser.bio,
                status: currentUser.status,
                email: currentUser.email,
                role: currentUser.role
            });
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Updated user data:', formData);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Header  />
            
            <MDBox mt={12} mb={11}>
                <Grid container spacing={11}>
                    <Grid item xs={12} md={11} xl={11} sx={{ display: 'flex' }}>
                        <Divider orientation="vertical" sx={{ ml: -2, mr: 11}} />
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    InputProps={{  style: { width: '100%' } }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    InputProps={{ style: { width: '100%' } }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    InputProps={{  style: { width: '100%' } }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    InputProps={{ readOnly: true, style: { width: '100%' } }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    InputProps={{ readOnly: true, style: { width: '100%' } }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    value={formData.newPassword || ''}
                                    onChange={handleChange}
                                    InputProps={{ style: { width: '100%' } }}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    name="confirmNewPassword"
                                    type="password"
                                    value={formData.confirmNewPassword || ''}
                                    onChange={handleChange}
                                    InputProps={{ style: { width: '100%' } }}
                                />
                            </MDBox>
                            <Button type="submit" variant="contained" color="info">
                                Save Changes
                            </Button>
                        </form>
                        <Divider orientation="vertical" sx={{ mx: 0 }} />
                    </Grid>
                </Grid>
            </MDBox>
            
        </DashboardLayout>
    );
}

export default EditProfile;
