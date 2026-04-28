import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { useChats } from "../hooks/useChats";
import BlackboardShell from "../ui/BlackboardShell";
import ChatComposer from "../ui/ChatComposer";
import ChatHeader from "../ui/ChatHeader";
import ChatSidebar from "../ui/ChatSidebar";
import ChatThread from "../ui/ChatThread";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const { handelLogout } = useAuth();
  const {
    chats,
    activeChatId,
    messages,
    listLoading,
    messagesLoading,
    sending,
    error,
    selectChat,
    startNewChat,
    sendMessage,
    deleteChat,
    dismissError,
  } = useChats();

  const title = activeChatId
    ? chats.find((c) => String(c._id) === String(activeChatId))?.title || "Thread"
    : "New Thread";

  return (
    <BlackboardShell
      header={
        <ChatHeader
          title={title}
          userLabel={user?.userName || user?.email}
          onSignOut={handelLogout}
        />
      }
      sidebar={
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          listLoading={listLoading}
          onSelect={selectChat}
          onNew={startNewChat}
          onDelete={deleteChat}
        />
      }
    >
      {error ? (
        <div className="border-b border-white/15 bg-white/[0.04] px-4 py-2 text-xs text-white/70 sm:px-8">
          {error}
          <button type="button" className="ml-3 underline underline-offset-2" onClick={dismissError}>
            dismiss
          </button>
        </div>
      ) : null}
      <ChatThread
        messages={messages}
        messagesLoading={messagesLoading}
        activeChatId={activeChatId}
      />
      <ChatComposer onSend={sendMessage} sending={sending} />
    </BlackboardShell>
  );
}
