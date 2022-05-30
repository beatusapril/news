
import { useSelector } from "react-redux";
import { getUser } from "../../selectors/selectors";
import { Store } from "../../store/Types";
import { Navigate } from 'react-router-dom'
import { NotAuth } from "../helpers/NotAuth";

export function Main() {
  const user = useSelector<Store>(state => getUser(state));

  if (user) {
    return <Navigate to="/news" />
  }

  return <>
    {!user && <NotAuth />}
  </>
}