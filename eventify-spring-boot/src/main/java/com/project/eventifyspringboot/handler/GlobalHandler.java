package com.project.eventifyspringboot.handler;

import com.project.eventifyspringboot.handler.dto.ApiErrorDto;
import com.project.eventifyspringboot.handler.dto.InvalidFieldDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@ControllerAdvice
public class GlobalHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        HttpStatus httpstatus = HttpStatus.BAD_REQUEST;
        List<InvalidFieldDto> errors = exception
                .getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> new InvalidFieldDto()
                        .setField(((FieldError) error).getField())
                        .setMessage(error.getDefaultMessage()))
                .toList();

        ResponseValidationExceptionDto responseBody = new ResponseValidationExceptionDto(LocalDateTime.now(),
                httpstatus.value(), "Validation failed!", 1, errors);
        log.info("Validation failed - {}", errors, exception);
        return handleExceptionInternal(exception, responseBody, headers, httpstatus, request);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleResponseStatusException(ResponseStatusException exception,
                                                                WebRequest request) {
        ApiErrorDto responseBody = new ApiErrorDto(LocalDateTime.now(), exception.getStatusCode().value(), exception.getReason(), 2);
        log.info("{}", responseBody.getMessage(), exception);
        return handleExceptionInternal(exception, responseBody, new HttpHeaders(), exception.getStatusCode(), request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(Exception exception, WebRequest request) {
        log.error("Unexpected error!", exception);
        ApiErrorDto response = new ApiErrorDto(LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                666);
        return handleExceptionInternal(exception, response, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
