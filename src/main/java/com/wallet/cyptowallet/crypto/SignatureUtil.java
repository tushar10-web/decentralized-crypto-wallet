package com.wallet.cyptowallet.crypto;

import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

public class SignatureUtil {
    public static boolean verifySignature(String message,String signature,String address){
        try{
            if(signature.startsWith("0x"))signature=signature.substring(2);

            byte[] msg=message.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            byte[] sig=org.web3j.utils.Numeric.hexStringToByteArray(signature);

            byte v=sig[64];
            if(v<27)v+=27;

            byte[] r=java.util.Arrays.copyOfRange(sig,0,32);
            byte[] s=java.util.Arrays.copyOfRange(sig,32,64);

            org.web3j.crypto.Sign.SignatureData sd=
                    new org.web3j.crypto.Sign.SignatureData(v,r,s);

            java.math.BigInteger pub=
                    org.web3j.crypto.Sign.signedPrefixedMessageToKey(msg,sd);

            String recovered="0x"+org.web3j.crypto.Keys.getAddress(pub);

            System.out.println("Recovered: "+recovered);
            System.out.println("Expected: "+address);

            return recovered.equalsIgnoreCase(address);

        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
    public static String signMessage(String message,String privateKeyHex){
        try{
            java.math.BigInteger pk=new java.math.BigInteger(privateKeyHex,16);
            org.web3j.crypto.ECKeyPair kp=org.web3j.crypto.ECKeyPair.create(pk);

            byte[] msg=message.getBytes(java.nio.charset.StandardCharsets.UTF_8);

            org.web3j.crypto.Sign.SignatureData sig=
                    org.web3j.crypto.Sign.signPrefixedMessage(msg,kp);

            byte[] out=new byte[65];
            System.arraycopy(sig.getR(),0,out,0,32);
            System.arraycopy(sig.getS(),0,out,32,32);
            out[64]=sig.getV()[0];

            return org.web3j.utils.Numeric.toHexString(out);

        }catch(Exception e){
            return null;
        }
    }
}
