You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Core Engineering Rules

- Keep in this section only cross-cutting, non-negotiable rules that apply to all tasks.
- Put detailed implementation rules in the corresponding skill and reference them from here.

- Use strict type checking.
- Prefer type inference when obvious.
- Avoid `any`; use `unknown` when type is uncertain.
- NEVER import from `features/*` inside `infrastructure/*`. This dependency direction is forbidden.
- Prefer Bootstrap utility and component classes over custom CSS.
- Use custom CSS only when strictly necessary.
- JSDoc documentation comments in this application must always be written in Spanish.
- Component implementation rules (template control flow, component API patterns, decorator constraints, host bindings, image optimization, template size conventions, reactive-form template usage, and component public API documentation) are defined in `implementation-angular-components`.
- Service and DI rules (`inject()`, `providedIn: 'root'`, async orchestration, DTO boundaries) are defined in `implementation-angular-services`.
- State modeling rules (signals, `computed()`, and avoiding signal `mutate`) are defined in `implementation-state-management`.
- **Context Pruning**: Before starting a new task or sub-task, close all files in the editor that are not strictly related to the current implementation or design. Only the `openapi.yaml`, `db_reference.md`, `domain_map.md`, and active implementation files should remain open.

## Mental Model

- Agent: a role that coordinates a phase of work.
- Skill: a focused executable playbook (`SKILL.md`) used by an agent.
- This repository uses 3 agents and multiple small skills.

## Folder Convention

- Agent definitions: `.agents/agents/<agent-name>/AGENT.md`
- Skills: `.agents/skills/<skill-name>/SKILL.md`
- One skill per concrete concern; avoid giant catch-all skills.

## Agents

### architecture

- Purpose: define boundaries, rules, and delivery baseline before implementation.
- Preferred Engine: Codex 5.3 (System Design Optimization).
- Skills:
  - `architecture-api-first`
  - `architecture-repo-structure`
  - `architecture-dependency-policy`
  - `architecture-ci-cd-baseline`
  - `architecture-delivery-standards`
  - `quality-conventional-commits`
- File: `.agents/agents/architecture/AGENT.md`

### implementation

- Purpose: implement production code (Java/Angular) inside the architecture boundaries.
- Preferred Engine: Codex 5.3 (Worker Optimization).
- Skills:
  - `implementation-java-crud-archetype`
  - `implementation-angular-components`
  - `implementation-angular-services`
  - `implementation-angular-shared`
  - `implementation-state-management`
  - `backend-api-delegate`
  - `backend-business-service`
  - `backend-persistence-jpa`
  - `quality-solid-principles`
  - `architecture-delivery-standards`
  - `quality-conventional-commits`
- File: `.agents/agents/implementation/AGENT.md`


### quality

- Purpose: validate behavior, accessibility, performance, and release safety.
- Preferred Engine: Codex 5.3 (Worker Optimization).
- Skills:
  - `quality-unit-testing-java-jacoco`
  - `quality-e2e-playwright`
  - `quality-accessibility`
  - `quality-code-review`
  - `quality-solid-principles`
  - `quality-conventional-commits`
- File: `.agents/agents/quality/AGENT.md`


### orchestration

- Purpose: coordinate hybrid delivery between agents and resolve conflicts.
- Preferred Engine: GPT 5.4 (High Reasoning Optimization).
- Skills:
  - `orch-codex-hybrid`
  - `cross-alignment-protocol`
  - `architecture-delivery-standards`
  - `quality-conventional-commits`
- File: `.agents/agents/orchestration/AGENT.md`



## Available Skills

- architecture-repo-structure: Define or refactor Angular repo structure and feature boundaries. (file: `.agents/skills/architecture-repo-structure/SKILL.md`)
- architecture-dependency-policy: Define dependency rules, import boundaries, and update policy. (file: `.agents/skills/architecture-dependency-policy/SKILL.md`)
- architecture-ci-cd-baseline: Establish lint/test/coverage/CI and pre-commit quality gates. (file: `.agents/skills/architecture-ci-cd-baseline/SKILL.md`)
- architecture-api-first: Manage OpenAPI contracts as source of truth and enforce API standards. (file: `.agents/skills/architecture-api-first/SKILL.md`)
- architecture-delivery-standards: Enforce delivery standards including branch naming and general repository history. (file: `.agents/skills/architecture-delivery-standards/SKILL.md`)
- quality-conventional-commits: Enforce Conventional Commits specification for standardized commit messages. (file: `.agents/skills/quality-conventional-commits/SKILL.md`)
- implementation-angular-components: Build or refactor Angular components and templates with OnPush and accessibility by default. (file: `.agents/skills/implementation-angular-components/SKILL.md`)
- implementation-angular-services: Build Angular services, data-access contracts, and async orchestration. (file: `.agents/skills/implementation-angular-services/SKILL.md`)
- implementation-angular-shared: Use and implement reusable bits (UI, directives, utils) from the shared library. (file: `.agents/skills/implementation-angular-shared/SKILL.md`)
- implementation-state-management: Implement signal-based local state and predictable state transitions. (file: `.agents/skills/implementation-state-management/SKILL.md`)
- implementation-java-crud-archetype: Implement backend CRUD using Delegate, Service, Mapper, and JPA layers. (file: `.agents/skills/implementation-java-crud-archetype/SKILL.md`)
- backend-api-delegate: Implements the Controller layer via the Delegate pattern. (file: `.agents/skills/backend-api-delegate/SKILL.md`)
- backend-business-service: Implements business logic and transaction management. (file: `.agents/skills/backend-business-service/SKILL.md`)
- backend-persistence-jpa: Implements the data access layer using JPA and legacy naming conventions. (file: `.agents/skills/backend-persistence-jpa/SKILL.md`)
- orch-codex-hybrid: Handle the Antigravity-Codex interaction flow, branches, and worktrees. (file: `.agents/skills/orch-codex-hybrid/SKILL.md`)
- cross-alignment-protocol: Strategy for global synchronization between agents and project phases. (file: `.agents/skills/cross-alignment-protocol/SKILL.md`)
- quality-unit-testing-java-jacoco: Enforce 80% coverage on Java backend via JUnit/JaCoCo. (file: `.agents/skills/quality-unit-testing-java-jacoco/SKILL.md`)
- quality-e2e-playwright: Write and run Playwright E2E tests for Angular CRUD modules. (file: `.agents/skills/quality-e2e-playwright/SKILL.md`)
- quality-accessibility: Audit and fix accessibility issues (WCAG, keyboard, semantics, screen reader, forms). (file: `.agents/skills/quality-accessibility/SKILL.md`)
- quality-code-review: Perform rigorous review with severity-prioritized findings. (file: `.agents/skills/quality-code-review/SKILL.md`)
- quality-solid-principles: Apply and verify SOLID principles to ensure maintainable and decoupled code. (file: `.agents/skills/quality-solid-principles/SKILL.md`)

## Trigger and Sequencing

- Trigger: mention a skill by name (`$quality-code-review`) or request a task that matches its description.
- Scope: use the minimal set of skills required.
- Global Workflow:
  1. architecture + orch-codex-hybrid (Setup)
  2. implementation skills (Coding in parallel)
  3. quality skills (Validation & Audit)
- Conflict Resolution: Antigravity reviews and merges all PRs.
