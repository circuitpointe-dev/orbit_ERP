
import React, { useState, useEffect } from 'react';
import ManualProposalCreationDialog from '../proposal-management/ManualProposalCreationDialog';
import { useNavigate } from 'react-router-dom';

const ManualProposalCreationPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Open the dialog when the page loads
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Navigate back to proposal management when dialog closes
    navigate('/dashboard/fundraising/proposal-management');
  };

  return (
    <div className="space-y-6 p-6">
      <ManualProposalCreationDialog 
        open={isOpen} 
        onOpenChange={handleClose}
        proposalTitle="New Proposal"
        opportunityName="Selected Opportunity"
      />
    </div>
  );
};

export default ManualProposalCreationPage;
