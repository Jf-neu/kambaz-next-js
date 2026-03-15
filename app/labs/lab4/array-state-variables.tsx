import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function ArrayStateVariable() {
    const { todos } = useSelector((state: RootState) => state.todosReducer);

    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>

            <Button variant="success" onClick={addElement}>
                Add Element
            </Button>

            <Table bordered >
                <tbody>
                    {array.map((item, index) => (
                        <tr key={index}>
                            <td>{item}</td>
                            <td style={{ width: "120px" }}>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteElement(index)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <hr />
        </div>
    );
}