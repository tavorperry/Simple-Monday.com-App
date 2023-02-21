import React from "react";
import styled from "styled-components";

const Column = styled.div`
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center; 
    font-size: 1 rem;
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
    
    &:hover {
        background-color: #e0e0e0;
  }
`;

const ItemDataRow = ({selectedItem}) => {
    return (
        <Row>
            {selectedItem.map(item =>
              <Column key={item.text}>
                  {item.text}
              </Column>
                  )}
        </Row>
    );
}

export default ItemDataRow;
