import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const App = () => {
  const [inp, setInp] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: inp });
    e.target.reset();
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage(data.message);
    });
  }, [socket]);
  const handleChange = (e) => {
    setInp(e.target.value);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit"> submit</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default App;
