package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_marc_marca")
@Data
@NoArgsConstructor
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "marc_co_codigo")
    private Long id;

    @Column(name = "marc_li_nombre", nullable = false, unique = true)
    private String nombre;

    @Column(name = "marc_in_activo")
    private boolean activo = true;
}
