import { Main } from "#/components/layout/main";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersTable } from "./components/users-table";
import UsersProvider from "./context/users-context";
import { userListSchema } from "./data/schema";
import { users } from "./data/users";

export default function TeamMembers() {
  const teamMemberList = userListSchema.parse(users);

  return (
    <UsersProvider>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
            <p className="text-muted-foreground">Manage your team members, roles, and project assignments.</p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <UsersTable data={teamMemberList} columns={columns} />
        </div>
      </Main>
      <UsersDialogs />
    </UsersProvider>
  );
}
