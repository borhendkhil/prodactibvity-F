/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import MDBadge from 'components/MDBadge';

// Images
import team2 from 'assets/images/team-2.jpg';
import team3 from 'assets/images/team-3.jpg';
import team4 from 'assets/images/team-4.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Job component
const Roll = ({ title, description }) => (
  <MDBox>
    <MDTypography variant="caption" fontWeight="medium">
      {title}
    </MDTypography>
    <MDTypography variant="caption" color="text">
      {description}
    </MDTypography>
  </MDBox>
);


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

export default function data() {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const fetchedDepartments = await getAllDepartments();
      setDepartments(fetchedDepartments); // Assign data directly
    };

    fetchDepartments();
  }, []);

  const Depart = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const rows = departments.map((department) => ({
    author: <Depart name={department.name} />,
    function: <Roll title="Manager" description={department.manager} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={department.status}
          color={department.status === 'Active' ? 'success' : 'warning'}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    employed: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        <a href="#">user</a>
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: 'Department Name', accessor: 'author', width: '45%', align: 'left' },
      { Header: 'Manager', accessor: 'function', align: 'left' },
      { Header: 'Status', accessor: 'status', align: 'center' },
      { Header: 'Users', accessor: 'employed', align: 'center' },
    ],
    rows,
  };
}
