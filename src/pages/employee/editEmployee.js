import React, { useEffect, useState } from "react";
import EmployeeForm from "../../components/employee/employeeForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  get_employee_by_employee_id_api,
  put_employee_api,
} from "../../services/employeeService";
import Breadcrumbs from "../../components/common/breadcrumbs/breadcrumbs";
import LoadingSpinner from "../../components/common/loadingSpinner/loadingSpinner";
import { get_departments_api } from "../../services/departmentService";
import { toast } from "react-toastify";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await get_employee_by_employee_id_api(id);
        setEmployee(response.data.result);
      } catch (error) {
        console.log("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await get_departments_api();
        setDepartments(response.data.result);
      } catch (error) {
        console.log("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleUpdate = async (updatedEmployee) => {
    try {
      const response = await put_employee_api(id, updatedEmployee);
      if (response.status === 200) {
        toast.success("Employee updated successfully!");
        navigate("/main/employees");
      }
    } catch (error) {
      toast.error(error.message || "Error updating employee");
    }
  };

  return (
    <div>
      <Breadcrumbs />
      <h1>Edit Employee</h1>
      {employee ? (
        <EmployeeForm
          initialData={employee}
          onSubmit={handleUpdate}
          departments={departments}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default EditEmployee;
