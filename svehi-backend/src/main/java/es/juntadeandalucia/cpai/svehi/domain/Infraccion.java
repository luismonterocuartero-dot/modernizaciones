package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_infr_infraccion")
@Data
@NoArgsConstructor
public class Infraccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "infr_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @Column(name = "infr_fh_fecha")
    private LocalDate fecha;
    @Column(name = "infr_li_motivo")
    private String descripcion;
    @Column(name = "infr_li_importe", columnDefinition = "NUMERIC")
    private Double importe;
    @Transient
    private String estado;
}
