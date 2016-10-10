/* Completely clears out and recreates the database from scratch so that liquibase can take care of the rest */
DROP DATABASE IF EXISTS consensus;
CREATE DATABASE consensus;
GRANT USAGE ON *.* TO consensusUser@localhost IDENTIFIED BY 'consensusUser';
GRANT ALL PRIVILEGES ON consensus.* TO consensusUser@localhost;
FLUSH PRIVILEGES;