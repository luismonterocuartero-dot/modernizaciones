package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Entity
@Table(name = "t_d_peap_permisos_aplicacion")
@Data
@NoArgsConstructor
public class Permiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "peap_co_codigo")
    private Long id;

    @Column(name = "peap_li_nombre", nullable = false)
    private String nombre;

    @Transient
    private String objeto;

    @Transient
    private String tipoPermiso; // VISUALIZACION, EDICION

    @ManyToMany(mappedBy = "permisos")
    private Set<Usuario> usuarios;
}
