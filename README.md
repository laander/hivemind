# Hivemind

> A virtual matrix-like human battery park running realtime simulations

**Why?**  
- An exploration of new ES6+ES7 features (class, await/async, imports etc)
- Challenge module isolation and inter-module communication with event listeners etc
- Obey our machine overlords!

**How?**  
We're using Babel to transpile new ESnext features so it runs on Node

## Architecture

**Human**
Humans are the smallest units, having their own heartbeat loop and lifecycle. They are mounted into pods (1-to-1)

**Pod**
Pods have the sole purpose of containing humans and controlling their actions. Humans can be seeded, frozen, thawed and terminated. They are part of Clusters (1-to-many)

**Cluster**
Clusters are top-level entities that pods are connected to. They can generate new pods, shut them down and monitor their health.

## Next

- [ ] Energy transport system
- [ ] Command gates with RPC from Cluster => Pod => Human
- [ ] Separate human-controller AI into Pod
- [ ] Rewrite Human into using Proto mother class
- [ ] Kubernetes environment
