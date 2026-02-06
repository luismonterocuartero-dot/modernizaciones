package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_repo_repostaje")
@Data
@NoArgsConstructor
public class Repostaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "repo_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @Column(name = "repo_fh_fecha")
    private LocalDate fecha;
    @Column(name = "repo_nu_litros", columnDefinition = "NUMERIC")
    private Double litros;
    @Column(name = "repo_nu_importe", columnDefinition = "NUMERIC")
    private Double importe;
    @Column(name = "repo_nu_kilometros", columnDefinition = "NUMERIC")
    private Integer kilometros;
}
