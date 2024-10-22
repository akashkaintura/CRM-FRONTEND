import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import {
    Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@mui/material';

const GET_LEAVES = gql`
  query AllLeaves {
    allLeaves {
      id
      employeeId
      startDate
      endDate
      status
    }
  }
`;

const APPROVE_LEAVE = gql`
  mutation ApproveLeave($leaveId: String!) {
    approveLeave(leaveId: $leaveId) {
      status
    }
  }
`;

const Leaves: React.FC = () => {
    const { data, loading, error } = useQuery(GET_LEAVES);
    const [approveLeave] = useMutation(APPROVE_LEAVE);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error fetching leaves</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Leave Requests
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.allLeaves.map((leave: any) => (
                            <TableRow key={leave.id}>
                                <TableCell>{leave.employeeId}</TableCell>
                                <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                                <TableCell>{leave.status}</TableCell>
                                <TableCell>
                                    {leave.status === 'Pending' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => approveLeave({ variables: { leaveId: leave.id } })}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Leaves;
