# Devops-Actions-Docker
Github Actions CI/CD &amp; DOCKER

Simple Docker vs MultiStage 
Viktigaste är att dina utvecklingsberoende inte följer med till din version som är live då det kan förstöra den aktiva koden. (Man brukar inte vilja ligga på en live version eftersom då får man alla unga sjukdommar som kommer med paketen in i sin aktiva produkt.)
Man sparar lagringsplats eftersom att i production behöver du inte allt fluff som tester osv som du kanske behöver i din utvecklingsfas. 
Tldr snabbare CI/CD, och du ser även till att din docker image blir mindre aka tar mindre plats. antar att det även sparar pengar. 
