import css from "./SearchInput.module.css";
import { SearchIcon } from "../../icon/Icon";
import classNames from "classnames";

const SearchInput = ({onChange, value, onSearch, placeholder}) => { 
    return (
        <div className={classNames(css.searchBar)}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <SearchIcon
                onClick={onSearch}
                className={classNames(css.searchIcon)}
            />
      </div>
    )
}

export default SearchInput;