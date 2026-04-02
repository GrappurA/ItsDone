import { li, ul } from "motion/react-client"
import ListElement from "./ListElement"

export default function ListOfTodoLists(props) {

    const listOfListsOfTodoItems = props.items.map((listOfTodoItems, listIndex) =>
        <ul key={listIndex} className="m-2 rounded-2xl border-3 p-4">

            {listOfTodoItems.map((todoItem, itemIndex) =>
                <li key={itemIndex}></li>)}
        </ul>
    )


    return (
        <>{listOfListsOfTodoItems}</>
    )
}