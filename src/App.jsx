import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import ProjectsSideBar from "./components/ProjectsSideBar"
import { useState } from "react"

function App() {
    const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
    })

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

    let content;

    if(projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>;
    }else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
    }
    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects}/>
            {content}
        </main>
    )
}

export default App
