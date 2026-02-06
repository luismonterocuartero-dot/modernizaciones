package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Itv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItvRepository extends JpaRepository<Itv, Long> {
    List<Itv> findByVehiculoId(Long vehiculoId);
}
