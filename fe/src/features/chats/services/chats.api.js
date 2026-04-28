import API from "../../../config/apiClient.js";

export async function fetchChatsApi() {
    const { data } = await API.get("/api/chats/");
    return data;
}

export async function fetchMessagesApi(chatId) {
    const { data } = await API.get(`/api/chats/${chatId}/messages`);
    return data;
}

export async function sendMessageApi({ message, chat }) {
    const body = { message };
    if (chat) body.chat = chat;
    const { data } = await API.post("/api/chats/message", body);
    return data;
}

export async function deleteChatApi(chatId) {
    const { data } = await API.delete(`/api/chats/delete/${chatId}`);
    return data;
}
