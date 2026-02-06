package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_usua_usuario")
@Data
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usua_co_codigo")
    private Long id;

    @Column(name = "usua_li_dni", nullable = false, unique = true, length = 10)
    private String nif;

    @Column(name = "usua_li_nombre", nullable = false)
    private String nombre;

    @Column(name = "usua_li_apellido1", nullable = false)
    private String apellido1;

    @Column(name = "usua_li_apellido2")
    private String apellido2;

    @Transient
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "usua_in_activo")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.BooleanToNumberConverter.class)
    private boolean activo = true;

    @Column(name = "usua_fh_ult_acc")
    private LocalDate ultimoAcceso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perf_co_codigo")
    private Perfil perfil;

    // TODO: Relacionar con ServicioAdscrito cuando se defina esa entidad
    @Column(name = "sead_co_codigo")
    @Convert(converter = es.juntadeandalucia.cpai.svehi.converter.StringLongConverter.class)
    private String servicioAdscrito;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "t_m_peus_permisosapli_usuario", joinColumns = @JoinColumn(name = "usua_co_codigo"), inverseJoinColumns = @JoinColumn(name = "peap_co_codigo"))
    private java.util.Set<Permiso> permisos;
}
