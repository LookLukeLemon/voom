import {
  TITLE_HOME,
  TITLE_HOME_FUNCTION_JOIN_MEETING,
  TITLE_HOME_FUNCTION_NEW_MEETING,
  TITLE_MEETING,
} from 'common/Constants';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
import SearchBox from './SearchBox';

const getHeaderTitle = (asPath: string) => {
  if (asPath.startsWith('/room/')) {
    return TITLE_MEETING;
  } else if (asPath.startsWith('/new-room')) {
    return TITLE_HOME_FUNCTION_NEW_MEETING;
  } else if (asPath.startsWith('/rooms')) {
    return TITLE_HOME_FUNCTION_JOIN_MEETING;
  } else {
    return TITLE_HOME;
  }
};

const Header = () => {
  const { asPath } = useRouter();

  const title = getHeaderTitle(asPath);
  return (
    <header className="flex gap-6 sticky top-0 h-24 z-10 pl-12 pr-6">
      <h1 className="text-white self-center text-lg">{title}</h1>
      <SearchBox />
      <Avatar />
    </header>
  );
};

export default Header;
