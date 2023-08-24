import React from 'react';

const InputCustom = ({
    id, 
    type, 
    placeholder, 
    value, 
    handleChange, 
    rows = 3, 
    label, 
    min = 0,
    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png",
    inputRef
}) => {
    const inputProps = {
        id,
        type,
        placeholder,
        className: "mb-2 p-2 border rounded w-full",
    };

    if (type === 'textarea') {
        return (
            <div>
                {label && <label htmlFor={id}>{label}</label>}
                <textarea
                    {...inputProps}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    rows={rows}
                />
            </div>
        );
    }

    if (type === 'number') {
        return (
            <div>
                {label && <label htmlFor={id}>{label}</label>}
                <input
                    {...inputProps}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    min={min}
                />
            </div>
        );
    }

    if(type === 'file'){
        return (
            <div>
                {label && <label htmlFor={id}>{label}</label>}
                <input
                    {...inputProps}
                    ref={inputRef}
                    accept={accept}
                    onChange={handleChange}
                />
            </div>
        )
    }

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input 
                {...inputProps} 
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default InputCustom;