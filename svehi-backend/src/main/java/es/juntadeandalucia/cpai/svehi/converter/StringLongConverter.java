package es.juntadeandalucia.cpai.svehi.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StringLongConverter implements AttributeConverter<String, Long> {

    @Override
    public Long convertToDatabaseColumn(String attribute) {
        if (attribute == null || attribute.isBlank()) {
            return null;
        }
        try {
            return Long.parseLong(attribute);
        } catch (NumberFormatException e) {
            return null; // Or throw?
        }
    }

    @Override
    public String convertToEntityAttribute(Long dbData) {
        if (dbData == null) {
            return null;
        }
        return String.valueOf(dbData);
    }
}
