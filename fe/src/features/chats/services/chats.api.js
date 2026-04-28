import axios from "axios";

const chatsHttp = axios.create({
    baseURL: "http://localhost:3000/api/chats",
    withCredentials: true,
});

export async function fetchChatsApi() {
    const { data } = await chatsHttp.get("/");
    return data;
}

export async function fetchMessagesApi(chatId) {
    const { data } = await chatsHttp.get(`/${chatId}/messages`);
    return data;
}

export async function sendMessageApi({ message, chat }) {
    const body = { message };
    if (chat) body.chat = chat;
    const { data } = await chatsHttp.post("/message", body);
    return data;
}

export async function deleteChatApi(chatId) {
    const { data } = await chatsHttp.delete(`/delete/${chatId}`);
    return data;
}
