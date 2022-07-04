package dev.luoma.udacity.capstone.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "posts")
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "TEXT")
  private String text;

  @Column(length = 3500)
  private String imageUrl;

  @Column(length = 100)
  private String createdBy;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
      return false;
    Post post = (Post) o;
    return id != null && Objects.equals(id, post.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
