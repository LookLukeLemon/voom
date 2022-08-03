import Avatar from './Avatar';
import SearchBox from './SearchBox';

const Header = () => {
  return (
    <header className="flex gap-6 sticky top-0 h-24 z-10 pl-12 pr-6">
      <h1 className="text-white self-center text-lg">Home</h1>
      <SearchBox />
      <Avatar />
    </header>
  );
};

export default Header;
