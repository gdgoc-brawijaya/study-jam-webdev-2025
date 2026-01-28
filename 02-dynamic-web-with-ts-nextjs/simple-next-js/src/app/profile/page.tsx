"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Jevon");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");

  const submitHandler = () => {
    const profileData = {
      name: name,
      age: age,
      address: address,
    };

    localStorage.setItem("data", JSON.stringify(profileData));
    alert("Profile data saved!");

    setName("");
    setAge(0);
    setAddress("");
  };

  return (
    <div className="p-4">
      <h1>Welcome to Profile Page</h1>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        className="space-y-3"
      >
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ml-2 outline-1"
          />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="ml-2 outline-1"
          />
        </div>
        <div>
          <label htmlFor="">Address</label>
          <textarea
            name=""
            id=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="ml-2 outline-1"
          ></textarea>
        </div>

        <button className="px-4 py-2 ring-1">Save</button>
      </form>

      <div>
        <Link href={`/`}>Back to Main Page</Link>
      </div>
    </div>
  );
}
