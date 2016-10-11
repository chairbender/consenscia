package com.chairbender.consensus.webservice.datasource;

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Defines the MariaDB data source, with properties coming from
 * the command line. Expects these properties to be passed
 */
@Configuration
@Component
public class MariaDBDataSourceConfiguration {
    @Bean
    @Primary
    public DataSource dataSource() {
        return DataSourceBuilder
                .create()
                .username("consensusUser")
                .password("consensusUser")
                .url("jdbc:mysql://" + System.getProperty("databaseHostname") + ':' + System.getProperty("databasePort") + "/consensus")
                .driverClassName("com.mysql.jdbc.Driver")
                .build();
    }
}
