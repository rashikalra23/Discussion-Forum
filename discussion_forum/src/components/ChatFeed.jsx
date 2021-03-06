import MessageForm from "./MessageForm";
import MessageSent from "./MessageSent";
import MessageReceived from "./MessageReceived";


const ChatFeed = (props) => {
const { chats, activeChat, userName, messages } = props;
const chat = chats && chats[activeChat];


const renderMessages = () => {
    const keys = Object.keys(messages);
//console.log(messages)
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MessageSent message={message} />
              : <MessageReceived message={message} lastMessage={messages[lastMessageKey]} />}
                <div style ={{left: isMyMessage? "auto" : 0 }} className = "datetime"> {
              
              new Date(message.created).toLocaleString()
            }
            </div>
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));

if(!chat) return 'Loading...';

return(
    <div className="chat-feed">
       <div style={{display: 'flex'}}>
       <div className="chat-title-container">
            <div className="chat-title">{chat?.title} </div>
            <div className="chat-subtitle">
                 { chat.people.map((person) => {

                     return <span> {person.person.username}</span>;
                     
                 })}
            </div>
        </div>
        <button className="LogOut" onClick={()=>{
          localStorage.clear();
          window.location.reload();
        }}>
          LogOut 
        </button>
       </div>
       
        {renderMessages()}
        <div style={{ height: '100px'}} />
        <div className="message-from-container">
             <MessageForm { ...props} chatId={activeChat} />
        </div>
    </div>
);
}

export default ChatFeed;