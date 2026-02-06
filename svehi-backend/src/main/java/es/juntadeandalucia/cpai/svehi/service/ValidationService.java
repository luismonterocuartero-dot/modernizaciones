package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.exception.AppErrorCode;
import es.juntadeandalucia.cpai.svehi.exception.BusinessValidationException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Service for common validation logic across the application
 */
@Service
public class ValidationService {

    /**
     * Validates that a required string field is not null or empty
     */
    public void validateRequiredField(String value, String fieldName) {
        if (!StringUtils.hasText(value)) {
            throw new BusinessValidationException(
                    String.format("El campo '%s' es obligatorio", fieldName),
                    AppErrorCode.REQUIRED_FIELD_MISSING);
        }
    }

    /**
     * Validates that a required object is not null
     */
    public void validateRequiredObject(Object value, String fieldName) {
        if (value == null) {
            throw new BusinessValidationException(
                    String.format("El campo '%s' es obligatorio", fieldName),
                    AppErrorCode.REQUIRED_FIELD_MISSING);
        }
    }

    /**
     * Validates that a value is not negative
     */
    public void validateNonNegative(Number value, String fieldName) {
        if (value != null && value.doubleValue() < 0) {
            throw new BusinessValidationException(
                    String.format("El campo '%s' no puede ser negativo", fieldName),
                    AppErrorCode.INVALID_ARGUMENT);
        }
    }

    /**
     * Validates NIF format (basic validation)
     */
    public void validateNIF(String nif) {
        if (!StringUtils.hasText(nif)) {
            throw new BusinessValidationException(
                    "El NIF es obligatorio",
                    AppErrorCode.REQUIRED_FIELD_MISSING);
        }

        // Basic format validation (8 digits + 1 letter)
        if (!nif.matches("^[0-9]{8}[A-Z]$")) {
            throw new BusinessValidationException(
                    "El formato del NIF no es válido. Debe ser 8 dígitos seguidos de una letra mayúscula",
                    AppErrorCode.INVALID_ARGUMENT);
        }
    }

    /**
     * Validates email format
     */
    public void validateEmail(String email) {
        if (StringUtils.hasText(email) && !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new BusinessValidationException(
                    "El formato del email no es válido",
                    AppErrorCode.INVALID_ARGUMENT);
        }
    }

    /**
     * Validates phone number format (basic)
     */
    public void validatePhone(String phone) {
        if (StringUtils.hasText(phone) && !phone.matches("^[0-9]{9}$")) {
            throw new BusinessValidationException(
                    "El formato del teléfono no es válido. Debe contener 9 dígitos",
                    AppErrorCode.INVALID_ARGUMENT);
        }
    }
}
