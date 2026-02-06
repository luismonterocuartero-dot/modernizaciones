package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Operadora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperadoraRepository extends JpaRepository<Operadora, Long> {
    boolean existsByNombreIgnoreCase(String nombre);
}
