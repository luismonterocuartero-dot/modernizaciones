package es.juntadeandalucia.cpai.svehi.exception;

/**
 * Exception thrown when attempting to create a duplicate entity
 */
public class DuplicateEntityException extends RuntimeException {
    private final AppErrorCode errorCode;

    public DuplicateEntityException(String message) {
        super(message);
        this.errorCode = AppErrorCode.CONFLICT;
    }

    public AppErrorCode getErrorCode() {
        return errorCode;
    }
}
