package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Infraccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InfraccionRepository extends JpaRepository<Infraccion, Long> {
    List<Infraccion> findByVehiculoId(Long vehiculoId);
}
