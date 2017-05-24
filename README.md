# Natural-Selection-Simulator

Try it [here!](https://v-bhavsar.github.io/Natural-Selection-Simulator/)

This simulation uses genetic algorithms to simulate Darwinian natural selection. The ecosystem consists of biological entities, nutrition (green particles), and diseases (red particles). The ecosystem begins with the entities spawning with a random value for 4 different genes:

1) Attraction towards nutrition
2) Attraction towards disease
3) How far they can sense nutrition
4) How far they can see diseases

The entities move around the ecosystem trying to consume nutrition and avoid encountering diseases. Nutrition increases health, and diseases decrease health. Health also decreases with time.

There is a very small probability during each iteration that an entity will reproduce (produce a clone of itself with the same values for its genes with possibilities of tiny mutations).

Based on the work of Daniel Shiffman, the idea is that the entities with the stronger genes will survive for a longer period of time, and thus, have a higher probability of reproducing. Eventually, if the entire species does not die out, we should see all the species having very strong genes; hence, portraying evolution through natural selection.
