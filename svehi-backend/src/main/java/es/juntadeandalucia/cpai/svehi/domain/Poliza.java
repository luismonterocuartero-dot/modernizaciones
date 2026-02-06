package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_poli_poliza")
@Data
@NoArgsConstructor
public class Poliza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "poli_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comp_co_codigo")
    private Compania compania;

    @Column(name = "poli_li_npoliza")
    private String numeroPoliza;
    @Column(name = "poli_fh_inicio")
    private LocalDate fechaInicio;
    @Column(name = "poli_fh_fin")
    private LocalDate fechaFin;
    @Transient
    private Double importe;
}
