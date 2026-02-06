package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_m_maco_manteconcepto")
@Data
@NoArgsConstructor
public class ConceptoMantenimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maco_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mant_co_codigo", nullable = false)
    private Mantenimiento mantenimiento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "conc_co_codigo", nullable = false)
    private Concepto concepto;

    @Column(name = "maco_nu_cantidad", columnDefinition = "NUMERIC")
    private Integer cantidad;
    @Column(name = "maco_nu_preciouni", columnDefinition = "NUMERIC")
    private Double precioUnitario;

    @Transient
    private Double importeTotal;
}
