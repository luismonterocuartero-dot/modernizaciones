package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_mode_modelo")
@Data
@NoArgsConstructor
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mode_co_codigo")
    private Long id;

    @Column(name = "mode_li_nombre", nullable = false)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marc_co_codigo", nullable = false)
    private Marca marca;

    @Column(name = "mode_li_potencia")
    private String potencia;
    @Column(name = "mode_li_cilindrada")
    private String cilindrada;
    @Column(name = "para_co_codigo_tivehi")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.StringLongConverter.class)
    private String tipoVehiculo;
    @Column(name = "mode_li_extrativehi")
    private String infoExtraTipoVehiculo;
    @Column(name = "para_co_codigo_tirepo")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.StringLongConverter.class)
    private String alimentacion;
    @Column(name = "mode_li_extrarepo")
    private String infoExtraTipoAlimentacion;

    @Transient
    private boolean activo = true;
}
