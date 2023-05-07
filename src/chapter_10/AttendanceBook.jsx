import React from "react";

const students = [
    {
        id : 1,
        name : "Temple",
    },
    {
        id : 2,
        name : "Hospitaller",
    },
    {
        id : 3,
        name : "Teutonic",
    },
    {
        id : 4,
        name : "Santiago",
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((students) => {
                return <li>key={students.id} {students.name}</li>
            } )}
        </ul>
    );
}

export default AttendanceBook;