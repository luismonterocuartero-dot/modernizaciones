package es.juntadeandalucia.cpai.svehi.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AppErrorCode {
    ENTITY_NOT_FOUND("SVEHI-001", "Entidad no encontrada"),
    INVALID_ARGUMENT("SVEHI-002", "Argumento inválido"),
    CONFLICT("SVEHI-003", "Conflicto de datos"),
    REQUIRED_FIELD_MISSING("SVEHI-004", "Campo obligatorio faltante"),
    DUPLICATE_ENTITY("SVEHI-005", "Entidad duplicada"),
    INVALID_REFERENCE("SVEHI-006", "Referencia inválida"),
    BUSINESS_RULE_VIOLATION("SVEHI-007", "Violación de regla de negocio"),
    CANNOT_DELETE_ENTITY("SVEHI-008", "No se puede eliminar la entidad"),
    UNEXPECTED_ERROR("SVEHI-999", "Error inesperado");

    private final String code;
    private final String description;
}
