/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as client from "./client";
import { useEffect, useState } from "react";
import { setAllUsers, setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error(err);
    }
    setPending(false);
  };

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      dispatch(setAllUsers(users));
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUsers();
  }, []);

  if (!pending) {
    return children;
  }
}
