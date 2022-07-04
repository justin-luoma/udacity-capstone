package dev.luoma.udacity.capstone.repo;

import dev.luoma.udacity.capstone.entity.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepo extends CrudRepository<Post, Long> {
  List<Post> findAllByCreatedBy(String createdBy);

  Optional<Post> findPostByIdAndCreatedBy(Long id, String createdBy);

  void deleteByIdAndCreatedBy(Long id, String createdBy);
}
