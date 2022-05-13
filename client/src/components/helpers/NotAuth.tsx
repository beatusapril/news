import { Link } from "react-router-dom";
import "../helpers/NotAuth.css"

export function NotAuth() {
    return <div className="not-auth__wrapper"><div className="not-auth">
        <p className="not-auth__header">News</p> 
        <Link to="/login">Login</Link> Not Register? <Link to="signup">Register</Link>
        </div>
        </div>
}