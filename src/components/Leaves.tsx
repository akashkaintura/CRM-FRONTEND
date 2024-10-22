import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching leaves</p>;

    // Display dynamic leave requests
    return (
        <div className="leaves-component">
            <h1>Leaves</h1>
            {data.allLeaves.map((leave) => (
                <div key={leave.id} className="leave-item">
                    <p>Employee: {leave.employeeId}</p>
                    <p>Start Date: {new Date(leave.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(leave.endDate).toLocaleDateString()}</p>
                    <p>Status: {leave.status}</p>
                    {leave.status === 'Pending' && (
                        <button onClick={() => approveLeave({ variables: { leaveId: leave.id } })}>
                            Approve Leave
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Leaves;
