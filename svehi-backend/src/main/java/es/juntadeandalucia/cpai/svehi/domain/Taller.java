package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "t_d_tall_taller")
@Data
@NoArgsConstructor
public class Taller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tall_co_codigo")
    private Long id;

    @Column(name = "tall_li_nombre", nullable = false)
    private String nombre;

    @Column(name = "tall_li_cif")
    private String cif;

    @Column(name = "tall_li_direccion")
    private String direccion;

    @Column(name = "tall_li_telefono")
    private String telefono;

    @Column(name = "tall_li_email")
    private String email;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServicioTaller> servicios;
}
