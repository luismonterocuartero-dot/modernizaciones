package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Equipamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipamientoRepository extends JpaRepository<Equipamiento, Long> {
    List<Equipamiento> findByVehiculoId(Long vehiculoId);
}
