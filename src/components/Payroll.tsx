import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const GET_PAYROLL = gql`
  query GetPayroll($employeeId: String!) {
    getEmployeePayroll(employeeId: $employeeId) {
      salary
      bonus
      deductions
    }
  }
`;

const Payroll: React.FC = () => {
    const employeeId = localStorage.getItem('employeeId');
    const { data, loading, error } = useQuery(GET_PAYROLL, {
        variables: { employeeId },
    });

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading payroll data</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Payroll Details
            </Typography>
            <Grid container spacing={4}>
                {/* Payroll Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Payroll Summary</Typography>
                            <Typography>Salary: ₹{data.getEmployeePayroll.salary}</Typography>
                            <Typography>Bonus: ₹{data.getEmployeePayroll.bonus}</Typography>
                            <Typography>Deductions: ₹{data.getEmployeePayroll.deductions}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Payroll;
