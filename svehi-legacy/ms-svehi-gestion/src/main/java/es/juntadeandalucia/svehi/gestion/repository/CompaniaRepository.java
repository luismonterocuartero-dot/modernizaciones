package es.juntadeandalucia.svehi.gestion.repository;

import es.juntadeandalucia.svehi.gestion.domain.CompaniaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompaniaRepository extends JpaRepository<CompaniaEntity, Long> {
}
