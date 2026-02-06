package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Repostaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RepostajeRepository extends JpaRepository<Repostaje, Long> {
    List<Repostaje> findByVehiculoId(Long vehiculoId);
}
