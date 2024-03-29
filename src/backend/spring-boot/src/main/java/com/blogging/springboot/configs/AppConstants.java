package com.blogging.springboot.configs;

public class AppConstants {

	public static final String DEFAULT_USERS_PATH = "pictures/users";
	public static final String DEFAULT_USERS_PICTURE = "pictures/users/default.png";

	public static final String DEFAULT_MEDIAS_PATH = "pictures/medias";

	public static final String DEFAULT_ARTICLES_PATH = "pictures/articles";

	public static final String[] PUBLIC_GET_URLS = { "/v3/api-docs", "/v2/api-docs", "/v3/api-docs/**", "/swagger-ui/**",
					"/swagger-ui.html", "/configuration/**", "/swagger-resources", "/swagger-resources/**","/webjars/**", "v3/**",
					"/users/profile/**", "favicon.ico", "/articles", "/articles/getCover/**", "/articles/**", "/medias/getImage/**"};
	public static final String[] PUBLIC_POST_URLS = { "/register/**", "/login", "/register" };

}
