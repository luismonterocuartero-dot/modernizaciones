package es.juntadeandalucia.svehi.gestion.repository;

import es.juntadeandalucia.svehi.gestion.domain.MarcaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<MarcaEntity, Long> {
}
