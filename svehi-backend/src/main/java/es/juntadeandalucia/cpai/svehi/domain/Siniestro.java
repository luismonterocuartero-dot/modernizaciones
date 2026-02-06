package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_sini_siniestro")
@Data
@NoArgsConstructor
public class Siniestro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sini_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @Column(name = "sini_fh_fecha")
    private LocalDate fecha;
    @Column(name = "sini_li_observaciones") // or sini_li_motivo?
    private String descripcion;
    @Transient
    private Double importe;
    @Transient
    private String estado;
}
