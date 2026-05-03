package com.wallet.cyptowallet.repository;

import com.wallet.cyptowallet.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RepositoryUser extends MongoRepository<User,String> {
    Optional<User> findByAddress(String address);
}
