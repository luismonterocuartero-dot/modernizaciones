package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Parametro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParametroRepository extends JpaRepository<Parametro, Long> {
    boolean existsByNombreIgnoreCase(String nombre);
}
