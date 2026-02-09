import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-signup-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue={"alice"}
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        defaultValue={"123"}
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-first-name"
        placeholder="first name"
        defaultValue={"Alice"}
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-last-name"
        placeholder="last name"
        defaultValue={"Wonderland"}
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-date"
        type="date"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-date"
        type="email"
        placeholder="name@example.com"
        defaultValue={"alice@wonderland.com"}
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-user"
        placeholder="User"
        defaultValue={"User"}
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <Link
        id="wd-signout-btn"
        href="/account/signin"
        className="btn btn-danger w-100 mb-2"
        style={{ maxWidth: "300px" }}
      >
        Signout
      </Link>
    </div>
  );
}
