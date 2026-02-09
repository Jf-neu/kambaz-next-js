import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function SIgnup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <Link
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
        style={{ maxWidth: "300px" }}
      >
        Sign up{" "}
      </Link>
      <br/>
      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}