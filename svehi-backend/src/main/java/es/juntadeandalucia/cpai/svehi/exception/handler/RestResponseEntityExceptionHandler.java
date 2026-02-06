package es.juntadeandalucia.cpai.svehi.exception.handler;

import es.juntadeandalucia.cpai.svehi.exception.AppErrorCode;
import es.juntadeandalucia.cpai.svehi.exception.BusinessValidationException;
import es.juntadeandalucia.cpai.svehi.exception.DuplicateEntityException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {
        return buildResponse(AppErrorCode.ENTITY_NOT_FOUND, ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException ex) {
        return buildResponse(AppErrorCode.INVALID_ARGUMENT, ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BusinessValidationException.class)
    public ResponseEntity<Object> handleBusinessValidation(BusinessValidationException ex) {
        return buildResponse(ex.getErrorCode(), ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateEntityException.class)
    public ResponseEntity<Object> handleDuplicateEntity(DuplicateEntityException ex) {
        return buildResponse(ex.getErrorCode(), ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex) {
        return buildResponse(AppErrorCode.UNEXPECTED_ERROR, "Ocurrió un error inesperado",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Object> buildResponse(AppErrorCode errorCode, String message, HttpStatus status) {
        Map<String, Object> body = new HashMap<>();
        body.put("code", errorCode.getCode());
        body.put("description", errorCode.getDescription());
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }
}
