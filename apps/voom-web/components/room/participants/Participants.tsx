import ToggleButton from 'components/common/ToggleButton/ToggleButton';
import React, { useState } from 'react';
import ParticipantItem from './ParticipantItem';
import ParticipantList from './ParticipantList';

const Participants = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <div className="p-6 space-y-6 flex-1 overflow-auto">
      <ToggleButton
        enabled={isEnabled}
        enabledDisplay="Participants"
        disabledDisplay="Viewers"
        onChange={setIsEnabled}
      />

      <div className="w-full h-[1px] bg-voom_base_third" />
      <ParticipantList>
        <ParticipantItem />
      </ParticipantList>
    </div>
  );
};

export default Participants;
