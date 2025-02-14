import './Users.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';

function Users() {
  return (
    <div className="Users-container">
      <h1>Users</h1>
      <AddUserForm />
      <UsersTable />
    </div>
  );
}

export default Users;
