export default function Input({textArea, label, ...props}) {
    return (
            <p>
                <label>{label}</label>
                {textArea ? <textarea name="" id="" {...props}></textarea> : <input type="text" {...props}/>}
            </p>
    )
}