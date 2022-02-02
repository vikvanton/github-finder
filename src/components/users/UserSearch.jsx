import { useState, useContext } from "react";
import GithubContext from "../context/github/GithubContext";
import AlertContext from "../context/alert/AlertContext";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import { FaTrashAlt, FaSistrix } from "react-icons/fa";
import useGithubActions from "../context/github/GithubActions";

function UserSearch() {
    const [text, setText] = useState("");

    const { users, loading } = useContext(GithubContext);

    const { alert, dispatchAlert } = useContext(AlertContext);

    const { searchUsers, clearUsers } = useGithubActions();

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleEnterDown = (e) => {
        if (e.code === "Enter") {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text === "") {
            dispatchAlert({
                type: "SET_ALERT",
                payload: {
                    msg: "Please enter something",
                    type: "usersSearchError",
                },
            });

            setTimeout(() => dispatchAlert({ type: "REMOVE_ALERT" }), 3000);
        } else {
            searchUsers(text);
            setText("");
        }
    };

    const handleClear = () => {
        clearUsers();
    };

    return (
        <div className="mx-auto mb-3 w-5/6 sticky top-0 z-10 p-1 bg-slate-900/50 rounded-lg">
            <form onSubmit={handleSubmit} className="m-2">
                <div className="form-control">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pr-40 bg-gray-200 input text-black block focus:shadow-none focus:outline-slate-600"
                            placeholder="Search"
                            value={text}
                            title="Type to search"
                            onChange={handleChange}
                            onKeyDown={handleEnterDown}
                        />
                        {users.length > 0 && (
                            <button
                                className="btn btn-warning absolute top-0 right-[48px] 
                                    rounded-none"
                                onClick={handleClear}
                                title="Clear search results"
                            >
                                <FaTrashAlt />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="absolute top-0 right-0 rounded-l-none 
                                    w-30 btn btn-success"
                            title="Find users"
                        >
                            <FaSistrix />
                        </button>
                    </div>
                </div>
            </form>
            {alert.type === "usersSearchError" && <Alert />}
            {loading && <Spinner />}
        </div>
    );
}

export default UserSearch;
