import React from "react";
import styled from "styled-components";

const Column = styled.div`
    width: 120px;
    color: blue;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #444;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
`;

const TableHeadRow = ({selectedColumns}) => {
    return (
        <Row>
            {selectedColumns.map((column) => (
                <Column key={column}>
                    {column}
                </Column>
                ))
            }
        </Row>
    );
}

export default TableHeadRow;
