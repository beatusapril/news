import { Link } from "react-router-dom";

export function NotAuth(){
    return <div> <Link to="/login">Login</Link> Not Register? <Link to="signup">Register</Link></div>
}