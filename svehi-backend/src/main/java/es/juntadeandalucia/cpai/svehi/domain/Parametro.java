package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_para_parametro")
@Data
@NoArgsConstructor
public class Parametro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "para_co_codigo")
    private Long id;

    @Column(name = "para_li_nombre", nullable = false)
    private String nombre;

    @Transient
    private String centroDirectivo;
    @Transient // tipa_co_codigo id type?
    private String tipoParametro;
    @Column(name = "para_li_literalextra")
    private String infoExtra;
    @Column(name = "para_in_datosextra")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.BooleanToNumberConverter.class)
    private boolean datosExtra;

    @Column(name = "para_in_activo")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.BooleanToNumberConverter.class)
    private boolean activo = true;
}
