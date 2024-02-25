import { useReducer, useState } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { todoReducer } from "./reducer";

import "./app.css";
import Table from "./components/table";

export function App() {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const [completed, setCompleted] = useState([])

    return (
        <>
            <Header dispatch={dispatch} />
            <Main todos={todos} dispatch={dispatch} completed={completed} setCompleted={setCompleted} />
            <Footer todos={todos} dispatch={dispatch} />
            <Table todos={todos}/>
        </>
    );
}
