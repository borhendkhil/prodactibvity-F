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

// @mui material components
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard';
import ProfilesList from 'examples/Lists/ProfilesList';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';

// Overview page components
import Header from 'layouts/profile/components/Header';


// Data
import profilesListData from 'layouts/profile/data/profilesListData';

// Images
import homeDecor1 from 'assets/images/home-decor-1.jpg';
import homeDecor2 from 'assets/images/home-decor-2.jpg';
import homeDecor3 from 'assets/images/home-decor-3.jpg';
import homeDecor4 from 'assets/images/home-decor-4.jpeg';
import team1 from 'assets/images/team-1.jpg';
import team2 from 'assets/images/team-2.jpg';
import team3 from 'assets/images/team-3.jpg';
import team4 from 'assets/images/team-4.jpg';
import React, { useState, useEffect } from 'react';
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



function Overview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { username, bio, status, password, email, role } = user;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header name={username} roll={role} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={11} xl={11}>
            <ProfileInfoCard
              bio="Profile Information"
              description={bio}
              info={{
                fullName: username,
                Status: status === 0 ? "Inactive" : "Active",
                Email: email,
                Role: role,
              }}
              action={{ route: "/editProfile", tooltip: "Edit Profile" }}
              shadow
              sx={{
                width: "100%",
                height: "auto",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                },
              }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
