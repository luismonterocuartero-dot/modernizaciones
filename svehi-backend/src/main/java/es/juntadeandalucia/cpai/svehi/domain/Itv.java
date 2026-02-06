package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_itvs_itvs")
@Data
@NoArgsConstructor
public class Itv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itvs_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @Column(name = "itvs_fh_fecha")
    private LocalDate fecha;
    @Transient // Map to smallint if needed, string in entity
    private String resultado;
    @Column(name = "itvs_fh_fechasig")
    private LocalDate fechaProxima;
    @Transient
    private String estacion;
    @Transient
    private Double importe;
}
