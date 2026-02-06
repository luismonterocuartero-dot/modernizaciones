package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Concepto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConceptoRepository extends JpaRepository<Concepto, Long> {
    boolean existsByNombreIgnoreCase(String nombre);
}
