package dev.luoma.udacity.capstone.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatePostRequestRO {
  private String text;
  private String imageUrl;
}
