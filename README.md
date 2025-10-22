# Devops-Actions-Docker
Github Actions CI/CD &amp; DOCKER

Simple Docker vs MultiStage 
Viktigaste är att dina utvecklingsberoende inte följer med till din version som är live då det kan förstöra den aktiva koden. (Man brukar inte vilja ligga på en live version eftersom då får man alla unga sjukdommar som kommer med paketen in i sin aktiva produkt.)
Man sparar lagringsplats eftersom att i production behöver du inte allt fluff som tester osv som du kanske behöver i din utvecklingsfas. 
Tldr snabbare CI/CD, och du ser även till att din docker image blir mindre aka tar mindre plats. antar att det även sparar pengar. 


Varför man vill ha en test.yml,
Så jag kan köra mina enhetstester och kika att allt funkar utan att behöva vänta ut hela min pipeline. Tar tid att vänta på allt i pipeline, bygga image deploya osv 


Docker uppgift 4
## Optimerad Dockerfile

Den nya Dockerfilen använder en **multi-stage build** som delar upp processen i:
- **Builder stage:** installerar alla beroenden och kör eventuell build.
- **Production stage:** innehåller endast de filer och produktionsberoenden som behövs för att köra appen.

### Fördelar
- **Mindre image-storlek:** Dev-beroenden och byggverktyg följer inte med till produktionen.
- **Snabbare builds:** Docker cache:ar installation av beroenden eftersom `package*.json` kopieras först.
- **Säkrare:** Endast nödvändiga komponenter i slutimagen minskar attackytan.
- **Mer förutsägbart:** `npm ci` ger identiska beroenden i CI/CD och lokalt.
