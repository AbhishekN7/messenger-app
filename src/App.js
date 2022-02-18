import { FormControl, Input } from '@material-ui/core';
import Message from './Message'
import { useEffect, useState } from 'react';
import './App.css';
import { db, auth } from "./firebase";
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import messenger from './Img/messenger.png';


function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');


  useEffect(() => {
    setUsername(prompt('Enter your Name'));
  }, [])

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    });
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }


  return (
    <div className="App">
      <img src={messenger} alt="messenger-logo"></img>
      <h1>Hello {username}!</h1>
      <h1>Welcome To The App 🔥</h1>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className="app__input" placeholder='Enter a message..' value={input} onChange={event => setInput(event.target.value)} />

          <IconButton className='app__iconButton' disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>


        </FormControl >
      </form >


      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>


    </div >
  );
}

export default App;
