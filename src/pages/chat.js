import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

export default function Chat() {
  const [user] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);

  const onDataChange = (items) => {
    let newChats = [];

    items.forEach((chat) => {
      console.log(chat.val());
      newChats.push(chat.val());
    });

    setChats(newChats);
  };

  useEffect(() => {
    db.ref("chats").on("value", onDataChange);

    return () => db.ref("chats").off("value", onDataChange);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setWriteError(null);

    try {
      await db.ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });
    } catch (e) {
      setWriteError(e.message);
    }
  }
  return (
    <div>
      {readError ? <p>Read Error{readError}</p> : null}
      <div className="chats">
        {chats.map((chat) => {
          return <p key={chat.timestamp}>{chat.content}</p>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></input>
        {writeError ? <p>Write Error{writeError}</p> : null}
        <button type="submit">Send</button>
      </form>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
}
