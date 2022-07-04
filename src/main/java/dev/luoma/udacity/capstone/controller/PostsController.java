package dev.luoma.udacity.capstone.controller;

import dev.luoma.udacity.capstone.business.PostBO;
import dev.luoma.udacity.capstone.request.CreatePostRequestRO;
import dev.luoma.udacity.capstone.request.UpdatePostRequestRO;
import dev.luoma.udacity.capstone.response.PostResponseRO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = PostsController.PATH, produces = "application/json")
@RequiredArgsConstructor
public class PostsController {
  public static final String PATH = "/api/posts";

  private final PostBO postBO;

  @PostMapping
  public PostResponseRO createPost(@RequestBody CreatePostRequestRO createPostRequest) {
    return postBO.createPost(createPostRequest);
  }

  @GetMapping
  public List<PostResponseRO> getPostsForUser() {
    return postBO.getPostsForUser();
  }

  @GetMapping("/{postId}")
  public PostResponseRO getPostByIdForUser(@PathVariable String postId) {
    return postBO.getPostByIdForUser(postId);
  }

  @DeleteMapping("/{postId}")
  public void deletePostByIdForUser(@PathVariable String postId) {
    postBO.deletePost(postId);
  }

  @PutMapping("/{postId}")
  public PostResponseRO updatePost(@PathVariable String postId, @RequestBody UpdatePostRequestRO updatePostRequest) {
    return postBO.updatePost(postId, updatePostRequest);
  }
}
