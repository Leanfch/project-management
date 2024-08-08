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

    let content;

    if(projectState.selectedProjectId === null) {
        content = <NewProject/>;
    }else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
    }
    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSideBar onStartAddProject={handleStartAddProject}/>
            {content}
        </main>
    )
}

export default App
