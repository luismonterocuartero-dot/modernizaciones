package es.juntadeandalucia.svehi.gestion.domain;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {

    @Column(name = "LI_CREACION", length = 70)
    private String creadoPor;

    @Column(name = "FH_CREACION")
    private LocalDateTime fechaCreacion;

    @Column(name = "LI_MODIFICACION", length = 70)
    private String modificadoPor;

    @Column(name = "FH_MODIFICACION")
    private LocalDateTime fechaModificacion;

    @Column(name = "IN_ELIMINADO")
    private Integer eliminado = 0;
}
