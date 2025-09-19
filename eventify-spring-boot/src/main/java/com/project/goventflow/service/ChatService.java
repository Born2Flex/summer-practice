package com.project.goventflow.service;

import com.project.goventflow.domain.dto.chat.ChatDto;
import com.project.goventflow.domain.dto.chat.ChatShortDto;
import com.project.goventflow.domain.entity.Chat;
import com.project.goventflow.domain.entity.Message;
import com.project.goventflow.domain.entity.User;
import com.project.goventflow.service.mapper.ChatMapper;
import com.project.goventflow.repository.ChatRepository;
import com.project.goventflow.repository.UserRepository;
import com.project.goventflow.config.security.AuthDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final SimpMessagingTemplate template;

    public ChatDto createChat(AuthDetails authDetails, String participantOne, String participantTwo) {
        List<ChatShortDto> participantOneChats = findChatsByUserId(participantOne);
        Optional<ChatShortDto> existingChat = participantOneChats.stream()
                .filter(x -> x.getParticipant().getId().equals(participantTwo))
                .findFirst();
        if (existingChat.isPresent()) {
            return findChatById(authDetails, existingChat.get().getId());
        }
        Chat chat = new Chat();

        List<User> participants = userRepository.findAllById(List.of(participantOne, participantTwo));
        chat.setParticipants(participants);
        chat.setMessages(new ArrayList<>());
        return chatMapper.toChatDto(chatRepository.save(chat));
    }

    public List<ChatShortDto> findChatsByUserId(String userId) {
        List<Chat> chats = chatRepository.findChatsByParticipantId(userId);
        return chatMapper.toShortDtoList(chats, userId);
    }

    public ChatDto findChatById(AuthDetails authDetails, String chatId) {
        Chat chat = getChatOrThrow(chatId);
        if (!chat.getParticipants().contains(authDetails.getUser())) {
            log.info("User with id {} trying to access chat with id {}", authDetails.getUser(), chatId);
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return chatMapper.toChatDto(chat);
    }

    public void addChatMessage(String chatId, Message message) {
        Chat chat = getChatOrThrow(chatId);
        message.setSendTime(LocalDateTime.now(ZoneOffset.UTC));
        chat.getMessages().add(message);
        chat.setLastMessage(message);
        chatRepository.save(chat);

        String receiver = getReceiver(chat, message.getSenderId());
        template.convertAndSendToUser(receiver, "/notifications", message);
        template.convertAndSendToUser(chatId, "/messages", message);
    }

    private String getReceiver(Chat chat, String senderId) {
        String receiver = null;
        for (User user : chat.getParticipants()) {
            if (!user.getId().equals(senderId)) {
                receiver = user.getId();
                break;
            }
        }
        if (receiver == null) {
            throw new IllegalStateException("No receiver found");
        }
        return receiver;
    }

    private Chat getChatOrThrow(String chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat with id " + chatId + " not found"));
    }
}
