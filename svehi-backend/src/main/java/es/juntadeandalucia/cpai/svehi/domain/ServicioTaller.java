package es.juntadeandalucia.cpai.svehi.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;
import java.util.Arrays;

@Entity
@Table(name = "t_m_seta_serviciotaller")
@Data
@NoArgsConstructor
public class ServicioTaller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seta_co_codigo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tall_co_codigo", nullable = false)
    private Taller taller;

    // SEAD_CO_CODIGO - Servicio Adscrito (FK)
    @Column(name = "sead_co_codigo")
    private Long servicioAdscritoId;

    // PARA_CO_CODIGO - Parameter (likely Centro Directivo or similar)
    @Column(name = "para_co_codigo")
    private Long parametroId;

    @Transient // Mapped manually or via service lookup
    private String centroDirectivo;

    @Transient // Mapped manually or via service lookup
    private String servicioAdscrito;

    @Column(name = "seta_fh_inicio")
    private LocalDate fechaInicio;

    @Column(name = "seta_fh_fin")
    private LocalDate fechaFin;

    @Column(name = "seta_li_motivofin")
    private String motivoFin;

    @Column(name = "seta_in_licitacion")
    private Boolean licitacion; // 1=true, 0=false

    @Column(name = "seta_li_nexpediente")
    private String numeroExpediente;

    @Column(name = "seta_li_contacto")
    private String nombreContacto;

    @Column(name = "seta_li_telefono")
    private String telefonoContacto;

    @Column(name = "seta_li_email")
    private String emailContacto;

    @Column(name = "seta_li_observaciones")
    private String observaciones;

    // Comma separated values for simple storage matching existing column types
    @Column(name = "seta_co_tipos_vehiculos")
    private String tiposVehiculosStr;

    @Column(name = "seta_co_conceptos")
    private String conceptosStr;

    @Transient
    private List<String> tiposVehiculos;

    @Transient
    private List<String> conceptos;

    @PostLoad
    private void onLoad() {
        this.licitacion = (this.licitacion != null && this.licitacion); // safe unbox if Integer? Hibernate handles
                                                                        // boolean mapping for NUMBER(1,0) usually if
                                                                        // configured, else might need converter
        if (tiposVehiculosStr != null) {
            this.tiposVehiculos = Arrays.asList(tiposVehiculosStr.split(","));
        }
        if (conceptosStr != null) {
            this.conceptos = Arrays.asList(conceptosStr.split(","));
        }
    }

    @PrePersist
    @PreUpdate
    private void onSave() {
        if (tiposVehiculos != null) {
            this.tiposVehiculosStr = String.join(",", tiposVehiculos);
        }
        if (conceptos != null) {
            this.conceptosStr = String.join(",", conceptos);
        }
    }
}
