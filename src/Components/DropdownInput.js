import React from "react";
import {Container} from "../Style/StyledComponents";

const DropdownInput = ({ options, onChange, value }) => {

    return (
        <Container>
            <select id="dropdown" value={value} onChange={onChange}>
                <option value="">Select an item</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </Container>
    );
}

export default DropdownInput;
