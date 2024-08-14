import { useState } from "react";

interface InputTaskProps {
    addTaskCallback: (arg0: string) => void;
}

const InputTask = (props: InputTaskProps) => {
    const [inputValue, setInputValue] = useState("");
    const callback = props.addTaskCallback;

    const clearInput = () => {
        callback(inputValue);
        setInputValue("");
    };

    return (
        <div style={{ paddingTop: "10%" }}>
            <h2>接下来，做什么</h2>
            <div className="row justify-content-center">
                <div className="col-6 mt-3 align-self-end">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control py-2"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        ></input>
                        <div className="input-group-append">
                            <button
                                className="btn btn-success py-2"
                                onClick={clearInput}
                                type="button"
                            >
                                添加
                                {/* <SiAddthis /> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputTask;