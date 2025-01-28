import { TableColumnsType } from "antd";
import Caption from "../components/Caption";
import CustomTable from "../components/CustomTable";
import { UsersType } from "../types/UsersType";
import getUsers from "../service/getUsers";

const Users = () => {
  const columns: TableColumnsType<UsersType> = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Username",
      dataIndex: "first_name",
    },
    {
      title: "Lastname",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const users = getUsers();

  return (
    <div>
      <Caption path="" title="Users" count={users.length} addBtnTitle="Create user" />
      <div className="p-5">
        <CustomTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Users;
