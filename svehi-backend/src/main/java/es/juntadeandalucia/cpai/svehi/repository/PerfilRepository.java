package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {
    Optional<Perfil> findByNombre(String nombre);
}
