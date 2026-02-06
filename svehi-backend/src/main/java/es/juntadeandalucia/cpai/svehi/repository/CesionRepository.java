package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Cesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CesionRepository extends JpaRepository<Cesion, Long> {
    List<Cesion> findByVehiculoId(Long vehiculoId);
}
