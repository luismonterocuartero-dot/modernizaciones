package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_d_oper_operadora")
@Data
@NoArgsConstructor
public class Operadora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oper_co_codigo")
    private Long id;

    @Column(name = "oper_li_nombre", nullable = false)
    private String nombre;

    @Column(name = "oper_li_contacto") // Check DB?
    private String contacto;
    @Column(name = "oper_li_telefono")
    private String telefono;
    @Column(name = "oper_li_direccion")
    private String direccion;

    @Transient // No active col found
    private boolean activo = true;
}
