package com.backend.globeonclick.service.impl;

import com.backend.globeonclick.dto.request.UserRequestDTO;
import com.backend.globeonclick.dto.response.UserResponseDTO;
import com.backend.globeonclick.entity.User;
import com.backend.globeonclick.exception.ResourceConflictException;
import com.backend.globeonclick.repository.IUserRepository;
import com.backend.globeonclick.service.interfaces.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO createUser(UserRequestDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new ResourceConflictException("Email ya registrado");
        }

        User user = User.builder()
                .name(userDTO.getName())
                .paternalSurname(userDTO.getPaternalSurname())
                .maternalSurname(userDTO.getMaternalSurname())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .dni(userDTO.getDni())
                .newsletter(userDTO.getNewsletter())
                .state(true)
                .build();

        User savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    // Otros métodos de la interfaz...

    private UserResponseDTO mapToDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .paternalSurname(user.getPaternalSurname())
                .maternalSurname(user.getMaternalSurname())
                .email(user.getEmail())
                .dni(user.getDni())
                .newsletter(user.getNewsletter())
                .build();
    }
} 