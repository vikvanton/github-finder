import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
    return (
        <div className="text-center mx-auto">
            <h1 className="text-6xl mb-4">Github Finder</h1>
            <p className="mb-4 text-2xl font-light">
                A React app to search GitHub profiles and see profile details.
                This project based on
                <strong>
                    <a href="https://www.udemy.com/course/modern-react-front-to-back/">
                        &nbsp;React Front To Back 2022&nbsp;
                    </a>
                </strong>
                Udemy course with some rework
            </p>
            <p className="text-lg text-gray-400">
                Version <span className="font-medium">1.1</span>
            </p>
            <p className="text-lg text-gray-400">
                Made by: <span className="font-medium">Gaiseric</span>
            </p>
            <p className="text-lg text-gray-400">
                Teacher:
                <a
                    className="font-medium"
                    href="https://traversymedia.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    &nbsp;Brad Traversy
                </a>
            </p>
            <p className="text-lg text-gray-400">
                Layout by:
                <a
                    className="font-medium"
                    href="https://twitter.com/hassibmoddasser"
                    target="_blank"
                    rel="noreferrer"
                >
                    &nbsp;Hassib Moddasser
                </a>
            </p>
            <Link to="/" className="btn btn-primary mt-4">
                <FaHome className="mr-2" />
                Back To Home
            </Link>
        </div>
    );
}

export default About;
