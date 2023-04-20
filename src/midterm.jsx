import React,{useState} from "react";

const props = [
    {
        btn: "사과",
        rs: "사과",
    },
    {
        btn: "사과",
        rs: "사과",
    },
    {
        btn: "사과",
        rs: "사과",
    },
];

function midterm(props) {
    return (
        <div>
            <div>
                <h1>어떤 과일을 좋아하나요?</h1>
            </div>
            <div>
                <span>{props.rs}</span>
            </div>
            <div>
                <button>{props.btn}</button>
                <button>{props.btn}</button>
                <button>{props.btn}</button>
            </div>
        </div>
    );
} 

export default midterm;