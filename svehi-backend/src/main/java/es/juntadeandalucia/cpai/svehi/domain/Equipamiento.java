package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_equi_equipamiento")
@Data
@NoArgsConstructor
public class Equipamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equi_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehi_co_codigo", nullable = false)
    private Vehiculo vehiculo;

    @Column(name = "equi_li_observaciones")
    private String descripcion;
    @Transient
    private LocalDate fechaInstalacion;
}
