import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearChatError,
    loadChats,
    loadMessages,
    removeChat,
    sendChatMessage,
    setActiveChat,
} from "../state/chats.slice.js";

export function useChats() {
    const dispatch = useDispatch();
    const {
        list,
        activeChatId,
        messages,
        listStatus,
        messagesStatus,
        sendStatus,
        error,
    } = useSelector((state) => state.chats);

    useEffect(() => {
        dispatch(loadChats());
    }, [dispatch]);

    useEffect(() => {
        if (!activeChatId) return;
        dispatch(loadMessages(activeChatId));
    }, [activeChatId, dispatch]);

    const selectChat = useCallback(
        (chatId) => {
            dispatch(setActiveChat(chatId));
        },
        [dispatch]
    );

    const startNewChat = useCallback(() => {
        dispatch(setActiveChat(null));
        dispatch(clearChatError());
    }, [dispatch]);

    const sendMessage = useCallback(
        async (text) => {
            const trimmed = String(text || "").trim();
            if (!trimmed) return;
            const data = await dispatch(
                sendChatMessage({ message: trimmed, chatId: activeChatId })
            ).unwrap();
            if (data.chat?._id) {
                await dispatch(loadMessages(String(data.chat._id))).unwrap();
            }
        },
        [activeChatId, dispatch]
    );

    const deleteChat = useCallback(
        async (chatId) => {
            await dispatch(removeChat(chatId)).unwrap();
        },
        [dispatch]
    );

    const dismissError = useCallback(() => {
        dispatch(clearChatError());
    }, [dispatch]);

    return {
        chats: list,
        activeChatId,
        messages,
        listLoading: listStatus === "loading",
        messagesLoading: messagesStatus === "loading",
        sending: sendStatus === "loading",
        error,
        selectChat,
        startNewChat,
        sendMessage,
        deleteChat,
        dismissError,
    };
}
