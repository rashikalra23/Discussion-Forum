import { ChatEngine } from 'react-chat-engine' ;
import ChatFeed from './components/ChatFeed' ;
import './App.css';
import LoginForm from './components/LoginForm';

const projectID = '9bce5f3d-e79c-4ebd-9906-a51cc8005649';

const App = () => {
    //if not logged in then return LoginForm
    if (!localStorage.getItem('username')) return <LoginForm />;

    return (
        <ChatEngine
             height = "100vh"
             projectID = {projectID}
             userName={localStorage.getItem('username')}
             userSecret={localStorage.getItem('password')}
             renderChatFeed = {(chatAppProps) => <ChatFeed {...chatAppProps} />}  
             onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}    
        />
    );
} ;


export default App;