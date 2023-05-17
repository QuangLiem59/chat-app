import Sidebar from "../sharedComponents/Sidebar/Sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
