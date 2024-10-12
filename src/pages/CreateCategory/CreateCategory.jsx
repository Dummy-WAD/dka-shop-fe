import { useEffect } from "react";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  // Example of search
  const searchText = useSelector((state) => state.search.searchText);
  useEffect(() => {
    console.log("search text", searchText);
  }, [searchText]);

  return <div>create category</div>;
};

export default CreateCategory;
