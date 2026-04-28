import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    deleteChatApi,
    fetchChatsApi,
    fetchMessagesApi,
    sendMessageApi,
} from "../services/chats.api.js";

export const loadChats = createAsyncThunk("chats/loadChats", async (_, { rejectWithValue }) => {
    try {
        return await fetchChatsApi();
    } catch (e) {
        return rejectWithValue(e.response?.data?.message || "Could not load chats");
    }
});

export const loadMessages = createAsyncThunk(
    "chats/loadMessages",
    async (chatId, { rejectWithValue }) => {
        try {
            const data = await fetchMessagesApi(chatId);
            return { chatId, messages: data.messages || [] };
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || "Could not load messages");
        }
    }
);

export const sendChatMessage = createAsyncThunk(
    "chats/sendMessage",
    async ({ message, chatId }, { rejectWithValue }) => {
        try {
            return await sendMessageApi({ message, chat: chatId || undefined });
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || "Could not send message");
        }
    }
);

export const removeChat = createAsyncThunk(
    "chats/removeChat",
    async (chatId, { rejectWithValue }) => {
        try {
            await deleteChatApi(chatId);
            return chatId;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || "Could not delete chat");
        }
    }
);

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        list: [],
        activeChatId: null,
        messages: [],
        listStatus: "idle",
        messagesStatus: "idle",
        sendStatus: "idle",
        error: null,
    },
    reducers: {
        setActiveChat: (state, action) => {
            const id = action.payload == null ? null : String(action.payload);
            state.activeChatId = id;
            state.messages = [];
            state.messagesStatus = id ? "idle" : "idle";
            state.error = null;
        },
        clearChatError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChats.pending, (state) => {
                state.listStatus = "loading";
                state.error = null;
            })
            .addCase(loadChats.fulfilled, (state, action) => {
                state.listStatus = "succeeded";
                state.list = action.payload.chats || [];
            })
            .addCase(loadChats.rejected, (state, action) => {
                state.listStatus = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(loadMessages.pending, (state) => {
                state.messagesStatus = "loading";
                state.error = null;
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.messagesStatus = "succeeded";
                if (String(state.activeChatId) === String(action.payload.chatId)) {
                    state.messages = action.payload.messages;
                }
            })
            .addCase(loadMessages.rejected, (state, action) => {
                state.messagesStatus = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(sendChatMessage.pending, (state) => {
                state.sendStatus = "loading";
                state.error = null;
            })
            .addCase(sendChatMessage.fulfilled, (state, action) => {
                state.sendStatus = "succeeded";
                const { chat, title } = action.payload;
                const previousChatId = action.meta.arg.chatId;
                if (chat && chat._id) {
                    const exists = state.list.some((c) => String(c._id) === String(chat._id));
                    if (!exists) {
                        state.list = [{ ...chat, title: title || chat.title }, ...state.list];
                    } else if (title) {
                        const idx = state.list.findIndex((c) => String(c._id) === String(chat._id));
                        if (idx !== -1) state.list[idx] = { ...state.list[idx], title };
                    }
                    if (!previousChatId) state.activeChatId = String(chat._id);
                }
            })
            .addCase(sendChatMessage.rejected, (state, action) => {
                state.sendStatus = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(removeChat.fulfilled, (state, action) => {
                const id = String(action.payload);
                state.list = state.list.filter((c) => String(c._id) !== id);
                if (String(state.activeChatId) === id) {
                    state.activeChatId = null;
                    state.messages = [];
                }
            })
            .addCase(removeChat.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export const { setActiveChat, clearChatError } = chatsSlice.actions;
export default chatsSlice.reducer;
