package es.juntadeandalucia.cpai.svehi.exception;

/**
 * Exception thrown when business validation rules are violated
 */
public class BusinessValidationException extends RuntimeException {
    private final AppErrorCode errorCode;

    public BusinessValidationException(String message) {
        super(message);
        this.errorCode = AppErrorCode.INVALID_ARGUMENT;
    }

    public BusinessValidationException(String message, AppErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public AppErrorCode getErrorCode() {
        return errorCode;
    }
}
