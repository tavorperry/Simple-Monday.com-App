import React, {useState, useEffect, useCallback} from 'react';
import { Container, StyledTable, Wrapper, StyledTh, StyledTd } from "./Style/StyledComponents";
import DropdownInput from "./Components/DropdownInput";
import TableHeadRow from "./Components/TableHeadRow";
import ItemDataRow from "./Components/ItemDataRow";

import axios from "axios";

const BoardInfo = () => {
    const [board, setBoard] = useState();
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [itemWithSelectedColsData, setItemWithSelectedColsData] = useState([]);

    const handleOptionChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const mapItemToSelectedColumns = useCallback( () => {
        const itemWithData = [];
        selectedColumns?.length > 0 && board.items.forEach(item => {
            if (selectedItem === item.id) {
                selectedColumns.map(selectedCol =>
                    item.column_values.forEach(col => {
                        if (selectedCol === col.title) {
                            const obj = {title: col.title, text: col.text};
                            itemWithData.push(obj);
                        }
                    })
                )
            }
        })
        setItemWithSelectedColsData(itemWithData);
    }, [board, selectedItem, selectedColumns]);

    useEffect(() => {
       mapItemToSelectedColumns();
    }, [mapItemToSelectedColumns, selectedColumns, selectedItem]);

    useEffect(() => {
        const requestBody = {
            query:
                "query {" +
                    "boards (ids: 1153051701) {" +
                        "owner{ id } " +
                        "id " +
                        "items {" +
                                "id " +
                                "name " +
                                "column_values {title, value, text}" +
                        "}" +
                        "columns {" +
                            "title " +
                            "type " +
                        "}" +
                    "}" +
                "}"
        };

        axios.post("https://api.monday.com/v2/", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNjkxOTgxMywidWlkIjozOTY3NDU2MiwiaWFkIjoiMjAyMy0wMi0xM1QxOToyMzowNS4yNThaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTUzNDE4MDksInJnbiI6ImV1YzEifQ.PB8x2_ogOHBeCZfvQFxcqFENCWkA3hst7wY5j6_kcCo"
                }
            })
            .then(res => {
                setBoard(res.data.data.boards[0]);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSelectColumn = (event) => {
        const columnTitle = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedColumns([...selectedColumns, columnTitle]);
        } else {
            const updatedSelectedColumns = selectedColumns.filter(col => col !== columnTitle);
            setSelectedColumns(updatedSelectedColumns);
        }
    };

    return (
        board ?
            <Container>
                <Wrapper>
                    <h1>Board Info</h1>
                    <StyledTable>
                        <thead>
                        <tr>
                            <StyledTh>Select</StyledTh>
                            <StyledTh>Field</StyledTh>
                        </tr>
                        </thead>
                        <tbody>
                            {board.items[0]?.column_values.map(col => (
                                <tr key={col.title}>
                                    <StyledTd>
                                        <input
                                            type="checkbox"
                                            value={col.title}
                                            onChange={handleSelectColumn}
                                        />
                                    </StyledTd>
                                    <StyledTd>
                                        <div key={col.title}>{col.title}</div>
                                    </StyledTd>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </Wrapper>
                <Wrapper>
                    <DropdownInput value={selectedItem} options={board.items} onChange={handleOptionChange}/>
                </Wrapper>
                <Wrapper>
                    {selectedItem &&
                        <Wrapper>
                            <TableHeadRow selectedColumns={selectedColumns}/>
                            <ItemDataRow selectedItem={itemWithSelectedColsData}/>
                        </Wrapper>
                    }
                </Wrapper>
            </Container>
            :
            <Wrapper>Loading...</Wrapper>
    );
}

export default BoardInfo;
