import getUsers from "../actions/getUsers";
import Sidebar from "../sharedComponents/Sidebar/Sidebar";
import ListUsers from "./components/ListUsers";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listUsers = await getUsers();
  return (
    // @ts-expect-error
    <Sidebar>
      <div className="h-full lg:pl-20">
        <ListUsers listUsers={listUsers} />
        {children}
      </div>
    </Sidebar>
  );
}
