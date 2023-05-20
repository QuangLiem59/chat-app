import UserItem from "@/app/users/components/UserItem";
import { User } from "@prisma/client";

interface ListUsersProps {
  listUsers: User[];
}

const ListUsers: React.FC<ListUsersProps> = ({ listUsers }) => {
  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col items-center w-full pb-20 overflow-y-auto border-r bg-gray-50 lg:w-80 lg:left-20 lg:pb-0">
      <div className="w-full px-2">
        <div className="flex items-center w-full py-4 border-b">
          <div className="pl-4 text-xl font-semibold text-gray-700">People</div>
        </div>
        <div className="flex flex-col mt-4">
          {listUsers.map((user) => (
            <UserItem key={user.id} data={user} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ListUsers;
