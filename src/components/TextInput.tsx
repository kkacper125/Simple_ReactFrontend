
interface Props{
    title?: string, 
    placeholder: string,
    value: string, 
    onChange?: (value: string) => void
}


function TextInput({title, placeholder, value, onChange}: Props){

    return (
        <>
            {title != null ? <label className="form-label">{title}</label> : null}
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </>
    )
}

export default TextInput