/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosWithCredentials.get(
        `${HTTP_SERVER}/api/courses/${cid}/users`,
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, [cid]);

  return (
    <table id="wd-people-table">
      <tbody>
        {users.map((user: any) => (
          <tr key={user._id}>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">{user.firstName}</span>
              <span className="wd-last-name">{user.lastName}</span>
            </td>
            <td className="wd-login-id">{user.loginId}</td>
            <td className="wd-section">{user.section}</td>
            <td className="wd-role">{user.role}</td>
            <td className="wd-last-activity">{user.lastActivity}</td>
            <td className="wd-total-activity">{user.totalActivity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
