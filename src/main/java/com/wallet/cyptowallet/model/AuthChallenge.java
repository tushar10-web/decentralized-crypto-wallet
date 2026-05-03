package com.wallet.cyptowallet.model;

public class AuthChallenge {
    private String challenge;


    public AuthChallenge(String challenge) {
        this.challenge = challenge;
    }

    public String getChallenge() {
        return challenge;
    }

}
