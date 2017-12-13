# consenscia
A webapp for capturing, understanding, and collaboratively building scientific consensus. Motivated by the replication crisis.

## Motivation
It's currently difficult to understand the state of scientific consensus. For a given study, it's hard to know whether to believe its conclusions. Basic things like replications, peer review, author credibility, retractions, etc...are useful for determining this, but are difficult or sometimes impossible to find.

Platforms like Wikipedia and StackExchange have managed to motivate users to collaboratively create large stores of structured, useful knowledge. Perhaps similar approaches could be used to create structured stores of knowledge about scientific research.

For example, let's say we want to figure out whether to believe the conclusions of a study, but we don't have the skills necessary to analyze the methodology or reasoning used within the paper. This is the situation that most people, including journalists, find themselves in. Here are just a few useful signals we can use to try to determine what to believe:
* It's currently difficult to determine if a study has been replicated unless you are a researcher who is staying on top of a given field. A successful replication, however (given the right circumstances) can be a VERY useful signal that a study's conclusions are to be trusted.
* Some journals are more trustworthy than other journals. This is hard to determine unless you know how to do it.
* Peer review. This is either difficult or impossible to find, as peer review is an internal part of journals. We can, however, look at post-publication peer review. PubPeer is one place we can do this, but few seem to be aware of this and participation here seems to be hit and miss. Also, pubpeer leaves it up to the reader to read through the comments on a paper and decide what to make of them. Given the technical nature of these discussions, most readers would be unable to do this.

So, what if we had a place where we could quickly see this information and perhaps calculate some sort of "score" for the quality of the research? What if we could see post-publication peer review, but with information from the scientific community on what to think about this commentary? What if we could see whether the study has been replicated?

For example, something that might be useful is if scientific peers can "rate" a paper based on their evaluation of its validity. Similarly, being able to "rate" peer review feedback could help us understand what feedback is or isn't valid. By looking at scientists publications and participation on such a platform, we can get an idea of how trustworthy their ratings are (we probably wouldn't want to let a biologist's rating heavily influence the score for a paper on social psychology). We may also want to pay attention to non-academic participants' feedback, if we can determine that they are capable of making useful judgements.

In order to create something like this, we would need to incentivize participation. This has been solved before on platforms like Wikipedia and StackExchange. It ought to be solvable in this domain, as well. One of the benefits (and difficulties) of this domain is that scientists have a reputation to uphold - this can be a useful incentive by itself.

This project aims to create something that can help us do this - to be able to determine the quality / trustworthiness of a published paper.
 
# Dev Instructions
## Configuring and Initializing Database
You must have a running MariaDB to point to where you want the data to be stored. It will be stored in a new database
called consensus. To configure for your environment, simply
make a copy of template.gradle.properties and rename it gradle.properties, then fill in the blanks.

Once that has been configured, run the "initializeDB" gradle task. Once you have done this, whenever you want
to make sure your database is up-to-date with what has been checked in, you can run the "updateDB" task.

This app consists of a frontend server (using gulp-connect) and a separate webservice server using
spring boot. By default, the frontend runs on port 8080 and the webservice runs on port 3000. You can change those
by modifying the ports in gulpfile.js and application.properties, respectively.

## Running and Developing
For development, this app consists of a frontend server (using gulp-connect) and a separate webservice server using
spring boot. It also consists of a MariaDB.

To initialize your database from scratch (or re-initialize it from scratch), run the "initializeDB" task. 
To make sure your database is up to date, simply run the "updateDB" task.

### Running servers
To start the webservice, run the "webserviceRun" task.
To start the frontend, run the "frontendRun" task.
Run the "frontendWatch" task so that frontend files will be automatically built and deployed when they are changed.

### Making changes
As long as you are running "frontendWatch", any frontend changes you make will cause the frontend to be compiled
and deployed.

Whenever you make webservice changes, running the "buildWebservice" task should cause the server to restart and the
changes to be applied.

Whenever you make changes to the database, you should make them in liquibaseDatabaseChangelog.xml. You can then apply 
them using the updateDB task

