package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    List<Matricula> findByVehiculoId(Long vehiculoId);
}
