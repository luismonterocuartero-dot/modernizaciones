package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Vehiculo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

        @Query("SELECT v FROM Vehiculo v WHERE " +
                        "(:matricula IS NULL OR 1=1) AND " +
                        "(:marcaId IS NULL OR v.marca.id = :marcaId)")
        Page<Vehiculo> findAllByFilters(@Param("matricula") String matricula,
                        @Param("marcaId") Long marcaId,
                        Pageable pageable);
}
