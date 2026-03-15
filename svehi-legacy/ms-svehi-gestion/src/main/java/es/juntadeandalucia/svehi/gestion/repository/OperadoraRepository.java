package es.juntadeandalucia.svehi.gestion.repository;

import es.juntadeandalucia.svehi.gestion.domain.OperadoraEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperadoraRepository extends JpaRepository<OperadoraEntity, Long> {
}
