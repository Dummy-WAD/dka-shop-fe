import { useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

const CreateCategory = () => {
  // Example of search
  const searchText = useSelector((state) => state.search.searchText);
  useEffect(() => {
    console.log("search text", searchText);
  }, [searchText]);
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CreateCategory;
