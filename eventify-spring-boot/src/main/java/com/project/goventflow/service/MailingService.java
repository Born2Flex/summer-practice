package com.project.goventflow.service;

import com.project.goventflow.config.properties.DomainProperties;
import com.project.goventflow.domain.dto.mailing.EventUpdateMessageDto;
import com.project.goventflow.domain.entity.Event;
import com.project.goventflow.domain.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailingService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final DomainProperties domainProperties;

    public void sendEventUpdateNotification(Event event) {
        EventUpdateMessageDto message = createMailingMessage(event);
        log.info("Trying to send event update notification to {}", message.getParticipantsEmails());
        Context context = new Context();
        context.setVariables(message.toMap());
        String emailText = templateEngine.process("event-update-template", context);
        String[] participantEmails = message.getParticipantsEmails().toArray(new String[0]);
        handleSendEmail("Event Update Notification", emailText, participantEmails);
    }

    private EventUpdateMessageDto createMailingMessage(Event event) {
        List<String> participantsEmails = event.getParticipants().stream()
                .map(User::getEmail)
                .toList();
        String eventUrl = domainProperties.getFront() + "/events/" + event.getId();
        return EventUpdateMessageDto.builder()
                .participantsEmails(participantsEmails)
                .eventTitle(event.getTitle())
                .eventUrl(eventUrl)
                .imageUrl(event.getImgUrl())
                .build();
    }

    private void handleSendEmail(String subject, String text, String... to) {
        try {
            sendEmail(subject, text, to);
            log.info("Notification email sent to: {}", (Object[]) to);
        } catch (MessagingException e) {
            log.error("Failed to send notification email to: {}", to, e);
        }
    }

    private void sendEmail(String subject, String text, String... to) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);
        mailSender.send(message);
    }
}
