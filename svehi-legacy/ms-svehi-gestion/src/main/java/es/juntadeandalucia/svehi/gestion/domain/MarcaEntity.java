package es.juntadeandalucia.svehi.gestion.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "T_D_MARC_MARCA")
@Getter
@Setter
@Where(clause = "IN_ELIMINADO = 0")
public class MarcaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "marc_seq")
    @SequenceGenerator(name = "marc_seq", sequenceName = "SVEH_SC07_MARC", allocationSize = 1)
    @Column(name = "MARC_CO_CODIGO")
    private Long id;

    @Column(name = "MARC_LI_NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "MARC_IN_ACTIVO")
    private Integer activo = 1;
}
