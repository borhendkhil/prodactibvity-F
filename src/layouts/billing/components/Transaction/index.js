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




import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Replace with your API URL
const API_URL = 'http://localhost:8080/api/users';

function Transaction() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from the backend
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <MDBox>
      <MDTypography variant="h6" color="primary">
        Users List
      </MDTypography>
      {users.length === 0 ? (
        <MDTypography>No users found</MDTypography>
      ) : (
        users.map((user) => (
          <MDBox key={user.id} mb={2} p={2} border="1px solid #ddd">
            <MDTypography variant="body1">Username: {user.username}</MDTypography>
            <MDTypography variant="body2">Email: {user.email}</MDTypography>
            <MDTypography variant="body2">Role: {user.role}</MDTypography>
            <MDTypography variant="body2">Status: {user.status}</MDTypography>
            <MDTypography variant="body2">Created At: {new Date(user.ceatedAt).toLocaleDateString()}</MDTypography>
          </MDBox>
        ))
      )}
    </MDBox>
  );
}

Transaction.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.node,
  name: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
};

export default Transaction;
