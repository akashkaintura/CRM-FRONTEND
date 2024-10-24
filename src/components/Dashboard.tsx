import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';

// Define the GraphQL query
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
    const { data, loading, error } = useQuery(GET_DASHBOARD_DATA, {
        variables: { employeeId: employeeId || '' },
        // skip: !employeeId,
    });

    if (!employeeId) {
        return <Typography color="error">Employee ID is not found. Please log in again.</Typography>;
    }
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading dashboard data</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </Typography>
            <Grid container spacing={4}>
                {/* Payroll Summary Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Payroll Summary</Typography>
                            <Typography>Salary: ₹{data?.getEmployeePayroll?.salary}</Typography>
                            <Typography>Bonus: ₹{data?.getEmployeePayroll?.bonus}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Leave Summary Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Leave Summary</Typography>
                            {data?.getEmployeeLeaves?.map((leave: any) => (
                                <div key={leave.startDate}>
                                    <Typography>Status: {leave.status}</Typography>
                                    <Typography>
                                        Start Date: {new Date(leave.startDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography>
                                        End Date: {new Date(leave.endDate).toLocaleDateString()}
                                    </Typography>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;