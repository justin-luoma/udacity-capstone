package dev.luoma.udacity.capstone.controller;

import dev.luoma.udacity.capstone.business.PostBO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(produces = "application/json")
public class AppController {

  private final PostBO postBO;

  @Value("${security.oauth2.resource.id}")
  private String resourceId;

  @Value("${auth0.domain}")
  private String domain;

  @Value("${auth0.clientId}")
  private String clientId;

  public AppController(PostBO postBO) {
    this.postBO = postBO;
  }

  @GetMapping("/api/public")
  @ResponseBody
  public String publicEndpoint() {
    return new JSONObject()
        .put("message", "Hello from a public endpoint! You don\'t need to be authenticated to see this.")
        .toString();
  }

  @GetMapping("/api/private")
  @ResponseBody
  public String privateEndpoint() {
    postBO.getSecurityInfo();
    return new JSONObject()
        .put("message", "Hello from a private endpoint! You need to be authenticated to see this.")
        .toString();
  }

  @GetMapping("/config")
  @ResponseBody
  public String getAppConfigs() {
    return new JSONObject()
        .put("domain", domain)
        .put("clientID", clientId)
        .put("audience", resourceId)
        .toString();
  }
}
