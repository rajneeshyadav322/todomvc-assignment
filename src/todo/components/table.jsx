import React from 'react'

const Table = ({ todos }) => {
    return (
        <>
            <table>
                <tr>
                    <th>Task</th>
                    <th>Created at</th>
                    <th>Completed at</th>
                </tr>
                {
                    todos?.map(task =>
                        <tr>
                            <td>{task.title}</td>
                            <td>{task.createdAt.toLocaleString()}</td>
                            <td>{task.completedAt ? task.completedAt.toLocaleString() : "Not Completed"}</td>
                        </tr>
                    )}

            </table>
        </>
    )
}

export default Table