import { JSX } from "preact";
import { useState } from "preact/hooks";

export default function LoginPage() {
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.currentTarget?.name]: e.currentTarget?.value.trim(),
    });
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    e.preventDefault();
    fetch("http://localhost:1993/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      });
  };

  return (
    <>
      <p class="flex gap-2 w-full">email: "{formData.email}"</p>
      <p class="flex gap-2 w-full">pass: "{formData.password}"</p>
      <label>
        Username
        <input
          type="email"
          name="email"
          onInput={handleChange}
          class="border-2"
        />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          name="password"
          onInput={handleChange}
          //   class="border-2"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
