package dev.luoma.udacity.capstone.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostResponseRO {
  private String id;
  private String text;
  private String imageUrl;
}
