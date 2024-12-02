import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/Department/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartment(response.data);
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };

    fetchDepartment();
  }, [id]);

  if (!department) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Department: {department.name}</h1>
      {/* Add your editing form or logic here */}
    </div>
  );
};

export default EditDepartment;
