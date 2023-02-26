import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { GET_MEMBERS } from './MemberPanelQueries';
import MemberPanelPresenter from './MemberPanelPresenter';

const MemberPanelContainer = ({ selectedMember, setSelectedMember }) => {
  const { data, loading } = useQuery(GET_MEMBERS);

  return (
    <MemberPanelPresenter
      loading={loading}
      data={data}
      selectedMember={selectedMember}
      setSelectedMember={setSelectedMember}
    />
  );
};

export default MemberPanelContainer;
