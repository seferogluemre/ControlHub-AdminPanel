import { Main } from "#/components/layout/main";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { TasksDialogs } from "./components/tasks-dialogs";
import { TasksPrimaryButtons } from "./components/tasks-primary-buttons";
import TasksProvider from "./context/tasks-context";
import { tasks } from "./data/tasks";

export default function Tasks() {
  return (
    <TasksProvider>
      <Main>
        <div className="mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
            <p className="text-muted-foreground">
              Organize, track, and manage your project tasks efficiently.
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <DataTable data={tasks} columns={columns} />
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  );
}
