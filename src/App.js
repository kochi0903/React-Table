import "./App.css";
import fakeData from "./MOCK_DATA.json";
import * as React from "react";
// import { useTable } from "react-table";
import Table from "./Table";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const data = React.useMemo(() => fakeData, []);

  const filterData = (data, searchTerm) => {
    return data.filter((row) => {
      return (
        row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const sortBy = (column) => {
    return (data, sortOrder) => {
      if (sortOrder === "asc") {
        return data.sort((a, b) => a[column].localeCompare(b[column]));
      } else {
        return data.sort((a, b) => b[column].localeCompare(a[column]));
      }
    };
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortBy: sortBy("id"),
      },
      {
        Header: "First Name",
        accessor: "first_name",
        sortBy: sortBy("first_name"),
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        sortBy: sortBy("last_name"),
      },
      {
        Header: "Email",
        accessor: "email",
        sortBy: sortBy("email"),
      },
      {
        Header: "Gender",
        accessor: "gender",
        sortBy: sortBy("gender"),
      },
      {
        Header: "University",
        accessor: "university",
        sortBy: sortBy("university"),
      },
    ],
    []
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data });

  return (
    <div>
      <input
        className="search-field"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <Table columns={columns} data={filterData(data, searchTerm)} />
    </div>
  );
}

export default App;
