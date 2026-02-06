package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_comp_compania")
@Data
@NoArgsConstructor
public class Compania {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_co_codigo")
    private Long id;

    @Column(name = "comp_li_nombre", nullable = false)
    private String nombre;

    @Column(name = "comp_li_contacto")
    private String contacto;
    @Column(name = "comp_li_telefono")
    private String telefono;
    @Column(name = "comp_li_direccion")
    private String direccion;

    @Column(name = "comp_in_activo")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.BooleanToNumberConverter.class)
    private boolean activo = true;
}
