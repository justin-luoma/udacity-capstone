package dev.luoma.udacity.capstone.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdatePostRequestRO {
  private String text;
  private String imageUrl;
}
