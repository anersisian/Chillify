import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryOpened, setLibraryOpened }) => {
  return (
    <nav>
      <h1>Chillify</h1>
      <button
        onClick={() => {
          setLibraryOpened(!libraryOpened);
        }}
      >
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
