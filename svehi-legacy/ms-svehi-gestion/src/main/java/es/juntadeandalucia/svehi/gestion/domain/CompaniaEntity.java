package es.juntadeandalucia.svehi.gestion.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "T_D_COMP_COMPANIA")
@Getter
@Setter
@Where(clause = "IN_ELIMINADO = 0")
public class CompaniaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comp_seq")
    @SequenceGenerator(name = "comp_seq", sequenceName = "SVEH_SC18_COMP", allocationSize = 1)
    @Column(name = "COMP_CO_CODIGO")
    private Long id;

    @Column(name = "COMP_LI_NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "COMP_IN_ACTIVO")
    private Integer activo = 1;
}
