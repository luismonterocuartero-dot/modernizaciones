package es.juntadeandalucia.svehi.gestion.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "T_D_MODE_MODELO")
@Getter
@Setter
@Where(clause = "IN_ELIMINADO = 0")
public class ModeloEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mode_seq")
    @SequenceGenerator(name = "mode_seq", sequenceName = "SVEH_SC08_MODE", allocationSize = 1)
    @Column(name = "MODE_CO_CODIGO")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MARC_CO_CODIGO", nullable = false)
    private MarcaEntity marca;

    @Column(name = "MODE_LI_NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "MODE_LI_CILINDRADA")
    private String cilindrada;

    @Column(name = "MODE_LI_POTENCIA")
    private String potencia;
}
