import React from 'react';
import { gql, useQuery } from '@apollo/client';

// Define types for Payroll and Leave data
interface Payroll {
    salary: number;
    bonus: number;
}

interface Leave {
    status: string;
    startDate: string;
    endDate: string;
}

// Define the type for the GraphQL query result
interface DashboardData {
    getEmployeePayroll: Payroll;
    getEmployeeLeaves: Leave[];
}


const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($employeeId: String!) {
    getEmployeePayroll(employeeId: $employeeId) {
      salary
      bonus
    }
    getEmployeeLeaves(employeeId: $employeeId) {
      status
      startDate
      endDate
    }
  }
`;

const Dashboard: React.FC = () => {
    const employeeId = localStorage.getItem('employeeId');
    const { data, loading, error } = useQuery<DashboardData>(GET_DASHBOARD_DATA, {
        variables: { employeeId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading dashboard data</p>;

    return (
        <div className="dashboard-component">
            <h1>Dashboard</h1>
            <div className="dashboard-summary">
                <h2>Payroll Summary</h2>
                <p>Salary: ₹{data?.getEmployeePayroll.salary}</p>
                <p>Bonus: ₹{data?.getEmployeePayroll.bonus}</p>
            </div>
            <div className="dashboard-leaves">
                <h2>Recent Leave Requests</h2>
                {data?.getEmployeeLeaves.map((leave: Leave) => (
                    <div key={leave.startDate}>
                        <p>Status: {leave.status}</p>
                        <p>Start Date: {new Date(leave.startDate).toLocaleDateString()}</p>
                        <p>End Date: {new Date(leave.endDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
