import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message'
import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { username: 'atharva', message: 'hey, guys' },
    { username: 'Abhishek', message: 'Hello' }
  ]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Enter your Name'));
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, { username: username, text: input }]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>Hello Programmers</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send Message</Button>
        </FormControl>
      </form>

      {
        messages.map(message => (
          <Message username={username} message={message} />
        ))
      }
    </div>
  );
}

export default App;
