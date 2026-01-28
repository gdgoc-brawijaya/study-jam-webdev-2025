"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ProfileData = {
  name: string;
  age: number;
  address: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const setData = (data: ProfileData) => {
      setName(data.name);
      setAge(data.age);
      setAddress(data.address);
    };

    const data = localStorage.getItem("data");
    if (data) {
      const parsedData: ProfileData = JSON.parse(data);
      setData(parsedData);
    }
  }, []);

  return (
    <div className="p-4">
      <h1>Name : {name}</h1>
      <h1>Age : {age}</h1>
      <h1>Address : {address}</h1>

      <div>
        <Link href={`/profile`}>Go To Profile</Link>
      </div>
    </div>
  );
}
