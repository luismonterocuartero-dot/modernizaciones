package es.juntadeandalucia.cpai.svehi.repository;

import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>, JpaSpecificationExecutor<Usuario> {

    Optional<Usuario> findByNif(String nif);

    boolean existsByNif(String nif);

    @org.springframework.data.jpa.repository.Query("SELECT u FROM Usuario u WHERE u.nif = :username AND u.activo = true")
    Optional<Usuario> findByUsernameAndActivoTrue(
            @org.springframework.data.repository.query.Param("username") String username);
}
