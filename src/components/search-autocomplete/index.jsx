import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import UsersList from "./usersList";

export default function SearchAutocomplete() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleClick(item) {
    setShowDropdown(false);
    setSearchParams(item);
    setUsersFiltered([]);
  }

  function handleChange(e) {
    const query = e.target.value.toLowerCase();
    setSearchParams(query);

    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setUsersFiltered(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  async function fetchUsersData() {
    try {
      setLoading(true);

      const response = await fetch("https://dummyjson.com/users");

      const data = await response.json();

      if (data && data.users && data.users.length) {
        setUsers(data.users.map((item) => item.firstName));
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsersData();
  }, []);

  if (loading)
    return (
      <p style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
        Please wait a few seconds
      </p>
    );

  console.log(users, searchParams);

  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="search any value"
        name="search-autocomplete"
        value={searchParams}
        onChange={handleChange}
      />

      {showDropdown && (
        <UsersList users={usersFiltered} handleClick={handleClick} />
      )}
    </div>
  );
}
