import React from 'react';

const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <div 
            onClick={onChange}
            style={{
                width: '38px',
                height: '20px',
                borderRadius: '9999px',
                padding: '2px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: checked ? '#238636' : '#30363d'
            }}
        >
            <div 
                style={{
                    backgroundColor: '#e6edf3',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                    transform: checked ? 'translateX(18px)' : 'translateX(0px)'
                }}
            />
        </div>
    );
};

export default ToggleSwitch;
