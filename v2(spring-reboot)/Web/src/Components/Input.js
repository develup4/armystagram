import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const useInput = (defaultValue, maxLength = 0) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    if (maxLength !== 0 && value.length > maxLength) {
      return;
    }
    setValue(value);
  };

  return { value, onChange, setValue };
};

const BasicInput = styled.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

export const Input = ({
  placeholder,
  required = true,
  value,
  onChange,
  type = 'text',
  className,
}) => (
  <BasicInput
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};
