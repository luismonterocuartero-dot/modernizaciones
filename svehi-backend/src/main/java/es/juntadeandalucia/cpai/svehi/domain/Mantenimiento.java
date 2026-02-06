package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "t_d_mant_mantenimiento")
@Data
@NoArgsConstructor
public class Mantenimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mant_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tall_co_codigo")
    private Taller taller;

    @Column(name = "mant_fh_autorizacion")
    private LocalDate fecha;
    @Column(name = "mant_li_observaciones")
    private String descripcion;
    @Column(name = "mant_nu_preciotot", columnDefinition = "NUMERIC")
    private Double importe;
    @Column(name = "mant_in_finalizado")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.BooleanToNumberConverter.class)
    private boolean finalizado;

    @OneToMany(mappedBy = "mantenimiento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConceptoMantenimiento> conceptos;
}
