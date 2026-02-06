package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "t_d_vehi_vehiculo")
@Data
@NoArgsConstructor
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehi_co_codigo")
    private Long id;

    // Matricula is in a separate table T_D_MATR_MATRICULA
    @Transient
    private String matricula;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "mode_co_codigo")
    private Marca marca;

    // Modelo name comes from Marca relationship
    @Transient
    private String modelo;

    // TipoVehiculo doesn't exist in DB - would need to be derived from parameters
    @Transient
    private String tipoVehiculo;

    @Column(name = "vehi_li_numbastidor")
    private String bastidor;

    @Column(name = "vehi_fh_compra")
    private LocalDate fechaMatriculacion;

    // Activo is derived from IN_ELIMINADO (0 = active, 1 = deleted)
    @Column(name = "in_eliminado")
    private Integer eliminado;

    @Transient
    public Boolean getActivo() {
        return eliminado == null || eliminado == 0;
    }

    public void setActivo(Boolean activo) {
        this.eliminado = (activo == null || activo) ? 0 : 1;
    }
}
