## Overview

Ce projet suit une Clean Architecture côté métier, combinée avec une approche feature-based côté frontend (Next.js).

L’objectif est de :

- Séparer clairement les responsabilités
- Rendre le projet maintenable et testable
- Faciliter l’onboarding des nouveaux développeurs

## Architecture globale

```
[ UI ]
   ↓
[ Features ]
   ↓
[ DI ]
   ↓
[ Application ]
   ↓
[ Domain ] ← cœur métier
   ↑
[ Infrastructure ]
```

**Les dépendances du code vont toujours vers le cœur métier**

**Le domaine ne dépend de rien**

## Structure des dossiers

```
src/
├─ ui/                  # Composants UI (Atomic / Presentation)
├─ features/            # Logique frontend par feature
├─ di/                  # Dependency Injection (container)
├─ application/         # Use cases & ports
├─ domain/              # Métier pur
├─ infrastructure/      # Implémentations techniques
```

## ui/ – User Interface

Contient uniquement le rendu UI.

- Pas d’appel direct aux use cases
- Pas de logique métier
- Utilise des props et callbacks

```
ui/
└─ auth/
   └─ login/
      ├─ LoginForm.tsx
      └─ login.schema.ts
```

**Les validators (Zod) sont placés au plus proche du composant qui les utilise.**

## features/ – Frontend Features

Contient la logique fonctionnelle côté frontend, organisée par feature métier.

- Orchestrer les interactions UI → backend
- Appeler les server actions

```
features/
└─ auth/
   ├─ hooks/
   │  ├─ useLogin.ts
   │  └─ useRegister.ts
   ├─ services/
   └─ types/
```

**Une feature représente une intention métier côté UI (Login, Register, CreateTicket, etc.)**

## di/ – Dependency Injection

Centralise l’instanciation et l’assemblage des dépendances.

```
di/
└─ container.ts
```

## application/ – Use Cases

Contient les cas d’utilisation.

- Orchestre le métier
- Ne connaît pas l’UI
- Dépend uniquement de ports (interfaces)

```
application/
└─ auth/
   ├─ use-cases/
   │  ├─ LoginUseCase.ts
   │  └─ RegisterUseCase.ts
   └─ ports/
      ├─ IUserRepository.ts
      └─ TokenService.ts
```

## domain/ – Domain Layer

Contient le cœur métier.

- Entités
- Value Objects
- Règles métier
- Erreurs métier

```
domain/
├─ entities/
│  └─ User.ts
├─ value-objects/
│  ├─ Email.ts
│  └─ Password.ts
└─ errors/
   ├─ DomainError.ts
   └─ UserAlreadyExistsError.ts
```

**Aucune dépendance externe**

**Aucun framework**

## infrastructure/ – Infrastructure Layer

Contient les implémentations techniques.

- Prisma
- JWT
- Hashing
- Repositories concrets

```
infrastructure/
├─ auth/
│  ├─ JwtTokenService.ts
│  └─ errors/
├─ repositories/
│  └─ UserRepository.ts
└─ prismaClient.ts
```

## Gestion des erreurs

### Domain Errors

- Violations des règles métier
- Placées dans domain/errors

**Exemple** : UserAlreadyExistsError, InvalidEmailError

### Application Errors

- Orchestration / workflow

### Infrastructure Errors

- JWT expiré
- Token invalide

**Exemple** : AccessTokenExpiredError, InvalidTokenError

## Tests

**Domain** : tests unitaires purs

**Application** : tests des use cases avec mocks

**Infrastructure** : tests d’intégration
