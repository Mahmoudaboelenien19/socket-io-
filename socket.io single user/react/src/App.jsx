import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const App = () => {
  const [inp, setInp] = useState("");
  const [iD, setID] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: inp, iD });
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
  const handleChangeID = (e) => {
    setID(e.target.value);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join_room", iD);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="message" onChange={handleChange} />
        <button type="submit"> submit</button>
      </form>
      <form action="      " onSubmit={joinRoom}>
        <input type="text" placeholder="id" onChange={handleChangeID} />
        <button type="submit"> id</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default App;
