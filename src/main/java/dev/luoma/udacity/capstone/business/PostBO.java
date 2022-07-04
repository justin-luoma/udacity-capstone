package dev.luoma.udacity.capstone.business;

import dev.luoma.udacity.capstone.entity.Post;
import dev.luoma.udacity.capstone.repo.PostRepo;
import dev.luoma.udacity.capstone.request.CreatePostRequestRO;
import dev.luoma.udacity.capstone.request.UpdatePostRequestRO;
import dev.luoma.udacity.capstone.response.PostResponseRO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@SessionScope
public class PostBO {

  final PostRepo postRepo;

  @Autowired
  public PostBO(PostRepo postRepo) {
    this.postRepo = postRepo;
  }

  public void getSecurityInfo() {
    Jwt principal = getJwt();
    log.info(principal.getClaims().toString());
    log.info(principal.getSubject());
  }

  private Jwt getJwt() {
    final var securityContext = SecurityContextHolder.getContext();
    final Authentication authentication = securityContext.getAuthentication();
    return (Jwt) authentication.getPrincipal();
  }

  public PostResponseRO createPost(CreatePostRequestRO createPost) {
    final String createdBy = getJwt().getSubject();
    final var post = Post.builder()
        .createdBy(createdBy)
        .text(createPost.getText())
        .imageUrl(createPost.getImageUrl())
        .build();

    final var createdPost = postRepo.save(post);
    return PostResponseRO.builder()
        .id(createdPost.getId().toString())
        .text(createdPost.getText())
        .imageUrl(createdPost.getImageUrl())
        .build();
  }

  public PostResponseRO updatePost(String postId, UpdatePostRequestRO updatePostRequest) {
    final long id = parseId(postId);
    final var post = postRepo
        .findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

    final String createdBy = getJwt().getSubject();
    if (!createdBy.equalsIgnoreCase(post.getCreatedBy())) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    post.setText(updatePostRequest.getText());
    post.setImageUrl(updatePostRequest.getImageUrl());
    final var updatedPost = postRepo.save(post);

    return PostResponseRO.builder()
        .id(updatedPost.getId().toString())
        .text(updatedPost.getText())
        .imageUrl(updatedPost.getImageUrl())
        .build();
  }

  public void deletePost(String postId) {
    final long id = parseId(postId);

    final String createdBy = getJwt().getSubject();

    final Optional<Post> post = postRepo.findPostByIdAndCreatedBy(id, createdBy);

    post.ifPresent(postRepo::delete);
  }

  public PostResponseRO getPostByIdForUser(String postId) {
    final long id = parseId(postId);
    final String createdBy = getJwt().getSubject();

    final var post = postRepo.findPostByIdAndCreatedBy(id, createdBy)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

    return PostResponseRO.builder()
        .id(post.getId().toString())
        .text(post.getText())
        .imageUrl(post.getImageUrl())
        .build();
  }

  public List<PostResponseRO> getPostsForUser() {
    final String createdBy = getJwt().getSubject();

    final var posts = postRepo.findAllByCreatedBy(createdBy);

    return posts.stream()
        .map(post -> PostResponseRO.builder()
            .id(post.getId().toString())
            .text(post.getText())
            .imageUrl(post.getImageUrl())
            .build())
        .toList();
  }

  private long parseId(String id) {
    try {
      return Long.parseLong(id);
    } catch (NumberFormatException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id should be a number");
    }
  }
}
