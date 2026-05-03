package com.wallet.cyptowallet.crypto;

import java.security.SecureRandom;
import java.util.Base64;

public class ChallengeGenerator {
    public static String generateChallenge() {
        return java.util.UUID.randomUUID().toString();
    }
}
