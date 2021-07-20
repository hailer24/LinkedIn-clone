import React, { useState } from "react";
import "./feed.css";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
function Feed() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  React.useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoURl: user.photoUrl || "",
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateRoundedIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption title="Image" color="#7085F9" Icon={ImageIcon} />
          <InputOption title="Video" color="#E7A33E" Icon={SubscriptionsIcon} />
          <InputOption title="Event" color="#C0CBCD" Icon={EventNoteIcon} />
          <InputOption
            title="Write Article"
            color="#7FC15E"
            Icon={CalendarViewDayIcon}
          />
        </div>
      </div>
      {posts.map(({ id, data: { name, description, message, photoURl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoURL={photoURl}
        />
      ))}
    </div>
  );
}

export default Feed;
