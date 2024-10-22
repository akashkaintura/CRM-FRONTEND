import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_EMPLOYEE_PAYROLL = gql`
  query GetEmployeePayroll($employeeId: String!) {
    getEmployeePayroll(employeeId: $employeeId) {
      salary
      bonus
      fiscalYear
    }
  }
`;

const Payroll: React.FC = () => {
    const employeeId = localStorage.getItem('employeeId');

    const { data, loading, error } = useQuery(GET_EMPLOYEE_PAYROLL, {
        variables: { employeeId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching payroll data</p>;

    return (
        <div className="payroll-component">
            <h1>Payroll</h1>
            <p>Salary: ₹{data.getEmployeePayroll.salary}</p>
            <p>Bonus: ₹{data.getEmployeePayroll.bonus}</p>
            <p>Fiscal Year: {data.getEmployeePayroll.fiscalYear}</p>
        </div>
    );
};

export default Payroll;
