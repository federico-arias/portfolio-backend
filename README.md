# Instrucciones cliente

Correr lo siguiente:

```bash
git pull --recurse-submodule
cd front-end/ && yarn && cd ..
docker-compose -f .standalone/docker-compose.yaml up -d
docker-compose -f .standalone/docker-compose.yaml exec postgres psql -U postgres --db komet
```

Abrir en un navegador http://komet.localhost/

# Install

```bash
yarn
docker-compose up -d
```

# Getting started

Re-run migrations with:

```bash
 docker-compose -f .standalone/docker-compose.yaml up \
    --force-recreate --renew-anon-volumes postgres
 ```

## To do

* Casbin Authorization Policies (use Middleware?)
* Transbank

# Planes

1. plan1 - social-networks, influencers
2. plan2 - e-commerce, influencers
3. plan3 - reportes, influencers

CRUD para añadir marcas.
CRUD para añadir benchmarks.
CRUD para añadir organizaciones.

un benchmark es un conjunto de marcas

organización -> 1:M benchmarks -> 1:M marcas (max N de acuerdo al plan)

tabla de marca
- nombre
- ['e-commerce', url del e-commerce]
