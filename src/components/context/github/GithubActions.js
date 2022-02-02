import axios from "axios";
import { useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../alert/AlertContext";
import GithubContext from "./GithubContext";

function useGithubActions() {
    const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const { dispatchAlert } = useContext(AlertContext);

    const { dispatchGithub } = useContext(GithubContext);

    const errorNavigate = useNavigate();

    const githubAxios = useMemo(
        () =>
            axios.create({
                baseURL: GITHUB_URL,
                headers: { Authorization: `token ${GITHUB_TOKEN}` },
            }),
        [GITHUB_TOKEN, GITHUB_URL]
    );

    const requestError = useCallback(
        (message) => {
            dispatchGithub({ type: "CLEAR_LOADING" });

            dispatchAlert({
                type: "SET_ALERT",
                payload: { msg: `${message}`, type: "requestError" },
            });

            errorNavigate("/notfound", { replace: true });
        },
        [dispatchGithub, dispatchAlert, errorNavigate]
    );

    const searchUsers = async (text) => {
        dispatchGithub({ type: "SET_LOADING" });

        const params = new URLSearchParams({
            q: text,
        });

        try {
            const response = await githubAxios.get(`/search/users?${params}`);

            if (response.data.items.length === 0) {
                dispatchGithub({ type: "CLEAR_LOADING" });

                dispatchAlert({
                    type: "SET_ALERT",
                    payload: { msg: "Nothing found", type: "usersSearchError" },
                });

                setTimeout(() => dispatchAlert({ type: "REMOVE_ALERT" }), 3000);
            } else {
                dispatchGithub({
                    type: "SET_USERS",
                    payload: response.data.items,
                });
            }
        } catch (error) {
            requestError(error.message);
        }
    };

    const clearUsers = () => dispatchGithub({ type: "CLEAR_USERS" });

    const getUserAndRepos = useCallback(
        async (login) => {
            dispatchGithub({ type: "SET_LOADING" });

            const params = new URLSearchParams({
                type: "public",
                sort: "updated",
                direction: "desc",
                per_page: 10,
            });

            try {
                const [user, repos] = await Promise.all([
                    githubAxios.get(`/users/${login}`),
                    githubAxios.get(`/users/${login}/repos?${params}`),
                ]);

                dispatchGithub({
                    type: "SET_USER_AND_REPOS",
                    payload: {
                        user: user.data,
                        repos: repos.data,
                    },
                });
            } catch (error) {
                requestError(error.message);
            }
        },
        [dispatchGithub, githubAxios, requestError]
    );

    const clearUserAndRepos = useCallback(
        () => dispatchGithub({ type: "CLEAR_USER_AND_REPOS" }),
        [dispatchGithub]
    );

    return {
        searchUsers,
        clearUsers,
        getUserAndRepos,
        clearUserAndRepos,
    };
}

export default useGithubActions;
