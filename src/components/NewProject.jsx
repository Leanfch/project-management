import Input from "./Input";

export default function NewProject() {
    return (
        <div>
            <menu>
                <li><button>Cancel</button></li>
                <li><button>Save</button></li>
            </menu>
            <div>
                <Input label="Title"/>
            </div>
            <div>
                <Input label="Description" textArea/>
            </div>
            <div>
                <Input label="Due Date"/>
            </div>
        </div>
    )
}