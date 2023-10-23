package com.blogging.springboot.configs;

import com.blogging.springboot.models.Profile;
import com.blogging.springboot.models.Role;
import com.blogging.springboot.models.User;
import com.blogging.springboot.repositories.ProfileRepository;
import com.blogging.springboot.repositories.RoleRepository;
import com.blogging.springboot.repositories.UserRepository;
import com.blogging.springboot.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

	private final RoleRepository roleRepo;
	private final ProfileRepository profileRepo;
	private final UserRepository userRepo;
	private final UserService userService;

	@Override
	public void run(String... args) throws Exception {

		try {
			if (profileRepo.count() == 0){
				Profile profile = new Profile();
				profile.setNomImg("default.png");
				profileRepo.save(profile);
			}
		  if (roleRepo.count() < 2) {
		    Role adminRole = new Role();
		    adminRole.setName("BLOGGER");
		    adminRole.setDescription("Blogger");

			  Role userRole = new Role();
			  userRole.setName("MEMBRE");
			  userRole.setDescription("Membre");

		    List<Role> roles = List.of(adminRole, userRole);

		    List<Role> savedRoles = roleRepo.saveAll(roles);

		    savedRoles.forEach(System.out::println);
		  }
		  if (userRepo.count() == 0) {
		    User admin = new User();
		    admin.setPassword("password");
		    admin.setFirstName("admin");
		    admin.setLastName("admin");
		    admin.setEmail("admin@admin.com");
		    admin.setPassword("password");
			  admin.setPhone("+237671234567");
				if (profileRepo.count() > 0)
					admin.setProfile(profileRepo.findById(1L).get());
		    if (roleRepo.count() > 0)
		        admin.setRoles(roleRepo.findAll());

		    userService.create(admin);
		    log.debug("created ADMIN user - {}", admin);
		  }
		} catch (Exception e) {
		  e.printStackTrace();
		}
	}
}

