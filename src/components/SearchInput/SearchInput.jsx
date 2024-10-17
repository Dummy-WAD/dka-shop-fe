import css from "./SearchInput.module.css";
import { SearchIcon } from "../../icon/Icon";
import classNames from "classnames";

const SearchInput = ({onSearch, placeholder, inputRef}) => { 
    return (
        <div className={classNames(css.searchBar)}>
            <input
                type="text"
                placeholder={placeholder}
                ref={inputRef}
            />
            <SearchIcon
                onClick={onSearch}
                className={classNames(css.searchIcon)}
            />
      </div>
    )
}

export default SearchInput;