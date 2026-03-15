package es.juntadeandalucia.svehi.gestion.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "T_D_OPER_OPERADORA")
@Getter
@Setter
@Where(clause = "IN_ELIMINADO = 0")
public class OperadoraEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "oper_seq")
    @SequenceGenerator(name = "oper_seq", sequenceName = "SVEH_SC35_OPER", allocationSize = 1)
    @Column(name = "OPER_CO_CODIGO")
    private Long id;

    @Column(name = "OPER_LI_NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "OPER_LI_DIRECCION")
    private String direccion;

    @Column(name = "OPER_LI_TELEFONO")
    private String telefono;

    @Column(name = "OPER_IN_ACTIVO")
    private Integer activo = 1;
}
