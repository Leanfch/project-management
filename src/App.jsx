import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import ProjectsSideBar from "./components/ProjectsSideBar"
import { useState } from "react"
import SelectedProject from "./components/SelectedProject"

function App() {
    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
    })

    function handleAddTask(text) {
        setProjectState(prevState => {
            const newTask = {
                text: text,
                id: Math.random(),
            };
            const updatedProjects = prevState.projects.map(project => {
                if (project.id === prevState.selectedProjectId) {
                    return {
                        ...project,
                        tasks: [newTask, ...project.tasks]
                    };
                }
                return project;
            });
            return {
                ...prevState,
                projects: updatedProjects
            };
        });
    }

    function handleDeleteTask(taskId) {
        setProjectState(prevState => {
            const updatedProjects = prevState.projects.map(project => {
                if (project.id === prevState.selectedProjectId) {
                    return {
                        ...project,
                        tasks: project.tasks.filter(task => task.id !== taskId)
                    };
                }
                return project;
            });
            return {
                ...prevState,
                projects: updatedProjects
            };
        });
    }

    function handleStartAddProject() {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectId: null,
            }
        })
    }

    function handleCancelProject() {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            }
        })
    }

    function handleAddProject(projectData) {
        setProjectState(prevState => {
            const newProject = {
                ...projectData,
                id: Math.random(),
                tasks: [],
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            }
        })
    }

    function handleSelectProject(id) {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectId: id,
            }
        })
    }

    function handleDeleteProject() {
        setProjectState(prevState => {
            return {
                ...prevState,
                projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
                selectedProjectId: undefined,
            }
        })
    }

    const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectedProjectId
    );

    let content = 
    <SelectedProject 
        project={selectedProject} 
        onDelete={handleDeleteProject} 
        onAddTask={handleAddTask} 
        onDeleteTask={handleDeleteTask}
        tasks={selectedProject ? selectedProject.tasks : []}
    />;

    if(projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>;
    }else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSideBar 
            onStartAddProject={handleStartAddProject} 
            projects={projectState.projects}
            onSelectProject={handleSelectProject} 
            selectedProjectId={projectState.selectedProjectId}
            />
            {content}
        </main>
    )
}

export default App