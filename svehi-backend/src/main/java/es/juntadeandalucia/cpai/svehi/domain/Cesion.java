package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_cesi_cesion")
@Data
@NoArgsConstructor
public class Cesion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cesi_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @Column(name = "cesi_fh_fechainicio")
    private LocalDate fechaInicio;
    @Column(name = "cesi_fh_fechafin")
    private LocalDate fechaFin;
    @Transient
    private String conductor;
    @Transient
    private String departamento;
}
