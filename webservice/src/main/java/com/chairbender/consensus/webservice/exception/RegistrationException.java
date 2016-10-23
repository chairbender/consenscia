package com.chairbender.consensus.webservice.exception;

/**
 * An exception that occurs during registration, with a message describing the reason registration failed.
 */
public class RegistrationException extends Exception {

    /**
     *
     * @param pFailureReason User friendly explanation of the reason the registration failed.
     */
    public RegistrationException(String pFailureReason) {
        super(pFailureReason);
    }
}
