package com.project.eventifyspringboot.service;

import com.project.eventifyspringboot.dto.chat.ChatDto;
import com.project.eventifyspringboot.dto.chat.ChatShortDto;
import com.project.eventifyspringboot.dto.chat.MessageDto;
import com.project.eventifyspringboot.entity.Chat;
import com.project.eventifyspringboot.entity.Message;
import com.project.eventifyspringboot.entity.User;
import com.project.eventifyspringboot.mapper.ChatMapper;
import com.project.eventifyspringboot.mapper.MessageMapper;
import com.project.eventifyspringboot.repository.ChatRepository;
import com.project.eventifyspringboot.repository.UserRepository;
import com.project.eventifyspringboot.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final MessageMapper messageMapper;

    public ChatDto createChat(String participantOne, String participantTwo) {
        Chat chat = new Chat();

        List<User> participants = userRepository.findAllById(List.of(participantOne, participantTwo));
        chat.setParticipants(participants);
        chat.setMessages(new ArrayList<>());
        return chatMapper.toChatDto(chatRepository.save(chat));
    }

    public List<ChatShortDto> findChatsByUserId(String userId) {
        List<Chat> chats = chatRepository.findChatsByParticipantId(userId);
        return chatMapper.toShortDtoList(chats);
    }

    public ChatDto findChatById(AuthDetails authDetails, String chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chat with id " + chatId + " not found"));
        if (!chat.getParticipants().contains(authDetails.getUser())) {
            log.info("User with id {} trying to access chat with id {}", authDetails.getUser(), chatId);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return chatMapper.toChatDto(chat);
    }

    public Message addChatMessage(String chatId, MessageDto message) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat with id " + chatId + " not found"));
        Message dbMessage = messageMapper.toMessage(message);
        chat.getMessages().add(dbMessage);
        chatRepository.save(chat);
        return dbMessage;
    }
}
