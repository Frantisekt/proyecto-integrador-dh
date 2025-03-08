public interface IUserService {
    UserResponseDTO createUser(UserRequestDTO userDTO);
    UserResponseDTO getUserById(Long id);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UserRequestDTO userDTO);
    void deleteUser(Long id);
    boolean existsByEmail(String email);
    boolean existsByDni(String dni);
} 