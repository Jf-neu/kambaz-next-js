/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../../../../account/client";
import PeopleTable from "../table";
export default function Users() {
 const [users, setUsers] = useState<any[]>([]);
 const { uid } = useParams();
 const fetchUsers = async () => {
   const users = await client.findAllUsers();
   setUsers(users);
 };
 useEffect(() => {
   // eslint-disable-next-line react-hooks/set-state-in-effect
   fetchUsers();
 }, [uid]);
 return (
   <div>
     <h3>Users</h3>
     <PeopleTable users={users} fetchUsers={fetchUsers} />
   </div>
);}

