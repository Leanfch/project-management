import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import ProjectsSideBar from "./components/ProjectsSideBar"
import { useState } from "react"
import SelectedProject from "./components/SelectedProject"

function App() {
    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    })

    function handleAddTask(text) {
        setProjectState(prevState => {
            const taskId = Math.random();
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: taskId,
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                tasks: [newTask, ...prevState.tasks]
            }
        })
    }

    function handleDeleteTask() {}

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
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId,
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
        tasks={projectState.tasks}
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
            />
            {content}
        </main>
    )
}

export default App
