import { HomeFunctionProps } from 'common/types';
import { useState } from 'react';
import VoomImage from 'public/images/voom.svg';
import PlusImage from 'public/images/plus-outline.svg';
import CalendarImage from 'public/images/calendar.svg';
import ScreenShareImage from 'public/images/screen-share.svg';
import useRoom from '../../../hooks/useRoom';
import {
  INFO_HOME_FUNCTION_JOIN_MEETING,
  INFO_HOME_FUNCTION_NEW_MEETING,
  INFO_HOME_FUNCTION_SCHEDULE,
  INFO_HOME_FUNCTION_SHARE_SCREEN,
  TITLE_HOME_FUNCTION_JOIN_MEETING,
  TITLE_HOME_FUNCTION_NEW_MEETING,
  TITLE_HOME_FUNCTION_SCHEDULE,
  TITLE_HOME_FUNCTION_SHARE_SCREEN,
} from 'common/Constants';

const useHomeFunction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onCreateRoom } = useRoom();

  const functions: HomeFunctionProps[] = [
    {
      title: TITLE_HOME_FUNCTION_NEW_MEETING,
      desc: INFO_HOME_FUNCTION_NEW_MEETING,
      image: VoomImage,
      onClick: () => {
        setIsOpen(!isOpen);
      },
    },
    {
      title: TITLE_HOME_FUNCTION_JOIN_MEETING,
      desc: INFO_HOME_FUNCTION_JOIN_MEETING,
      image: PlusImage,
      onClick: () => {
        return;
      },
    },
    {
      title: TITLE_HOME_FUNCTION_SCHEDULE,
      desc: INFO_HOME_FUNCTION_SCHEDULE,
      image: CalendarImage,
      onClick: () => {
        return;
      },
    },
    {
      title: TITLE_HOME_FUNCTION_SHARE_SCREEN,
      desc: INFO_HOME_FUNCTION_SHARE_SCREEN,
      image: ScreenShareImage,
      onClick: () => {
        return;
      },
    },
  ];

  return {
    isOpen,
    functions,
    onIsOpen: setIsOpen,
    onCreateRoom,
  };
};

export default useHomeFunction;
