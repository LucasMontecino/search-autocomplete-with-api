export default function UsersList({ users, handleClick }) {
  return (
    <ul>
      {users && users.length
        ? users.map((item, index) => (
            <li onClick={() => handleClick(item)} key={index}>
              {item}
            </li>
          ))
        : null}
    </ul>
  );
}
