package es.juntadeandalucia.cpai.svehi.config;

import es.juntadeandalucia.cpai.svehi.domain.Perfil;
import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import es.juntadeandalucia.cpai.svehi.repository.PerfilRepository;
import es.juntadeandalucia.cpai.svehi.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;

    private final org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Running manual schema patches...");
        try {
            jdbcTemplate.execute("ALTER TABLE t_d_usua_usuario ADD COLUMN IF NOT EXISTS password VARCHAR(255)");
            log.info("Patch: 'password' column ensured.");
        } catch (Exception e) {
            log.warn("Patch 'password' column warning: {}", e.getMessage());
        }

        /*
         * // Optional: Fix Vehiculo PK if needed later, but focusing on user first.
         * try {
         * // Checking if constraint exists is hard in raw SQL cross-db, but postgres:
         * // jdbcTemplate.
         * execute("ALTER TABLE t_d_vehi_vehiculo ADD PRIMARY KEY (vehi_co_codigo)");
         * } catch (Exception e) {}
         */

        log.info("Checking for existing users to unlock...");

        // Strategy change: Update existing users passwords instead of creating new one
        // to avoid ID generation issues (Sequence/Identity mismatch in legacy DB).

        int updated = jdbcTemplate
                .update("UPDATE t_d_usua_usuario SET password = ? WHERE password IS NULL OR password = ''", "admin123");
        log.info("Updated {} existing users with default password 'admin123'.", updated);

        log.info("Login enabled for ALL existing users with password 'admin123'.");
    }
}
