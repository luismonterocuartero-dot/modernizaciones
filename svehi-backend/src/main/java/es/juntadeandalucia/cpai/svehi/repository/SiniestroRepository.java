package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Siniestro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SiniestroRepository extends JpaRepository<Siniestro, Long> {
    List<Siniestro> findByVehiculoId(Long vehiculoId);
}
