package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_conc_concepto")
@Data
@NoArgsConstructor
public class Concepto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conc_co_codigo")
    private Long id;

    @Column(name = "conc_li_nombre", nullable = false)
    private String nombre;

    @Column(name = "conc_nu_preciouni", columnDefinition = "NUMERIC")
    private Double precioUnitario;
    @Column(name = "conc_nu_kilometros", columnDefinition = "NUMERIC")
    private Integer kilometros;
    @Column(name = "conc_nu_dias", columnDefinition = "NUMERIC")
    private Integer dias;
}
