package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_perf_perfil")
@Data
@NoArgsConstructor
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perf_co_codigo")
    private Long id;

    @Column(name = "perf_li_nombre", nullable = false, unique = true)
    private String nombre;

    @Column(name = "perf_in_activo")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.BooleanToNumberConverter.class)
    private boolean activo = true;
}
