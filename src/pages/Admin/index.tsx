import { Link } from "react-router-dom"
import { Users } from '../Users';



export function Admin() {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Users></Users>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}