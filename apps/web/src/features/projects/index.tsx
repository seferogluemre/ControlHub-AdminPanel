import { IconCheck, IconDotsVertical, IconFolders } from "@tabler/icons-react";
import { useState } from "react";
import { Main } from "#/components/layout/main";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { InfoPanel } from "./components/info-panel";
import { ProjectList } from "./components/project-list";
import { ProjectArea } from "./components/project-area";
import { NewProject } from "./components/new-project";
import { DROPDOWN_OPTIONS, UI_TEXTS } from "./data/constants";
import { useProjectState, useDisplayOptions } from "./hooks";


export default function Projects() {
  const {
    projects: projectList,
    selectedProject,
    mobileSelectedProject,
    createProjectDialogOpened,
    handleProjectSelect,
    handleBackClick,
    handleCloseProject,
    handleTogglePin,
    openNewProjectDialog,
    setCreateProjectDialog,
  } = useProjectState();

  const { displayOptions, handleToggleDisplayOption } = useDisplayOptions();

  const [scrollToDateFn, setScrollToDateFn] = useState<((date: string) => void) | null>(null);

  const handleAddComment = (comment: string) => {
    if (selectedProject) {
      console.log("Adding comment:", comment, "to project:", selectedProject.name);
    }
  };

  const handleTimelineClick = (date: string) => {
    if (scrollToDateFn) {
      scrollToDateFn(date);
    }
  };

  const projects = projectList.map(({ tasks, ...project }) => project);

  return (
    <>
      <Main fixed className="p-4 -mt-4">
        <div className="flex h-[calc(100vh-120px)] pt-0 gap-3">
          {/* 📁 Left Side - Project List */}
          <div className="w-64 min-w-[274px] max-w-[256px] bg-card flex flex-col overflow-hidden h-full rounded-xl shadow-md border">
            {/* Header */}
            <div className="p-2.5 border-b flex-shrink-0">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <IconFolders className="h-4 w-4 text-primary" />
                  <h1 className="text-base font-bold">Projects</h1>
                </div>

                {/* Display Options Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-7 w-7" title="Project Options">
                      <IconDotsVertical className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {DROPDOWN_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.key}
                        onClick={() => handleToggleDisplayOption(option.key)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-sm">{option.label}</span>
                        {displayOptions[option.key] && (
                          <IconCheck className="h-4 w-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Project List - Scrollable Area */}
            <div className="flex-1 overflow-hidden min-h-0">
              <ProjectList
                projects={projectList}
                selectedProject={selectedProject}
                onSelectProject={handleProjectSelect}
                onTogglePin={handleTogglePin}
                displayOptions={displayOptions}
              />
            </div>
          </div>

          {/* 📊 Middle - Project Area */}
          {selectedProject ? (
            <div className="flex-1 flex h-full min-h-0 overflow-hidden rounded-xl shadow-md">
              <ProjectArea
                selectedProject={selectedProject}
                onAddComment={handleAddComment}
                onBackClick={handleBackClick}
                showBackButton={!!mobileSelectedProject}
                onCloseProject={handleCloseProject}
                onScrollToDate={setScrollToDateFn}
              />
            </div>
          ) : (
            <div
              className="flex-1 flex flex-col items-center justify-center h-full rounded-xl shadow-md border"
              style={{ background: "color-mix(in oklab, var(--muted) 15%, transparent)" }}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <IconFolders className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{UI_TEXTS.projectSelectMessage}</h2>
                  <p className="text-muted-foreground">{UI_TEXTS.projectSelectSubMessage}</p>
                </div>
                <Button onClick={openNewProjectDialog} className="mt-4">
                  <IconDotsVertical className="h-4 w-4 mr-2" />
                  {UI_TEXTS.newProjectButton}
                </Button>
              </div>
            </div>
          )}

          {/* 📊 Right Side - Info Panel */}
          <div className="h-full overflow-hidden rounded-xl shadow-md">
            <InfoPanel selectedProject={selectedProject} onTimelineClick={handleTimelineClick} />
          </div>
        </div>
      </Main>

      <NewProject
        projects={projects}
        onOpenChange={setCreateProjectDialog}
        open={createProjectDialogOpened}
      />
    </>
  );
}


