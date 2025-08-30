import { Main } from "#/components/layout/main";
import { useTaskState } from "../projects/hooks";
import { TaskBoard } from "./components/task-board";
import { TaskHeader } from "./components/task-header";
import { TaskDialog } from "./components/task-dialog";

export default function Tasks() {
  const {
    tasksByStatus,
    selectedTask,
    createTaskDialogOpened,
    selectedProject,
    projects,
    handleTaskSelect,
    handleCloseTask,
    openNewTaskDialog,
    handleProjectFilter,
    setCreateTaskDialog,
  } = useTaskState();

  return (
    <Main className="h-full">
      <div className="flex flex-col h-full space-y-6">
        {/* Header Section */}
        <TaskHeader
          selectedProject={selectedProject}
          projects={projects}
          onProjectFilter={handleProjectFilter}
          onNewTask={openNewTaskDialog}
          taskCount={Object.values(tasksByStatus).flat().length}
        />

        {/* Task Board */}
        <div className="flex-1 min-h-0">
          <TaskBoard tasksByStatus={tasksByStatus} onTaskSelect={handleTaskSelect} />
        </div>
      </div>

      {/* Task Detail/Create Dialog */}
      <TaskDialog
        task={selectedTask}
        open={!!selectedTask || createTaskDialogOpened}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseTask();
            setCreateTaskDialog(false);
          }
        }}
        projects={projects}
      />
    </Main>
  );
}
