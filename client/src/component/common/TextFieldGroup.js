import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroups = ({
    name,
    placeholder,
    value,
    label,
    error,
    infor,
    type,
    onChange,
    disable

}) => {
    return (
        <div className="form-group">
            <input 
                type={type} 
                className={classnames("form-control form-control-lg",{'is-invalid': error})} 
                placeholder={placeholder} 
                name={name} 
                value = {value}  
                onChange={onChange} />
                {infor && <small className='font-text text-muted'>{infor}</small>}
                {error && <div className = "invalid-feedback">{error}</div>}
        </div>
    );
};

TextFieldGroups.prpsTypes = {
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value : PropTypes.string.isRequired,
    label  : PropTypes.string,
    error : PropTypes.string,
    infor : PropTypes.string,
    type : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    disable : PropTypes.string,
}

TextFieldGroups.defaultProps = {
    type : 'text'
}

export default TextFieldGroups;