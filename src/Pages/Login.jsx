import { useState } from "react";

import { loginUser } from "../services/authService";

const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    const data = await loginUser(
      email,
      password
    );

    console.log(data);
  };

  return (
    <form onSubmit={handleLogin}>

      <input
        type="email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Login
      </button>

    </form>
  );
};

export default Login;