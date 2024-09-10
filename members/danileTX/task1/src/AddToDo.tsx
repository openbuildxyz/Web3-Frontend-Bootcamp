import { useState } from "react";

interface InputTaskProps {
    addTaskCallback: (arg0: string) => void;
}



const InputTask = (props: InputTaskProps) => {
    const [inputValue, setInputValue] = useState("");
    const callback = props.addTaskCallback;

    const clearInput = () => {
        const tempval = inputValue.trim();
        if (!tempval) {
            return;
        }
        callback(tempval);
        
        setInputValue("");
    };

    
    return (
        <div style={{ paddingTop: "10%" }}>
            <h2>接下来，做什么</h2>
            <form id="todoForm" className="row g-3">
                <div className="row justify-content-center">
                    <div className="col-6 mt-3 align-self-end">
                        <div className="input-group has-validation">
                            <input
                                type="text"
                                className="form-control py-2"
                                id="validationCustom01"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required
                            ></input>
                            <div className="input-group-text">
                                <button
                                    className="btn btn-success py-2"
                                    onClick={clearInput}
                                    type="submit"
                                >
                                    添加
                                    {/* <SiAddthis /> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InputTask;