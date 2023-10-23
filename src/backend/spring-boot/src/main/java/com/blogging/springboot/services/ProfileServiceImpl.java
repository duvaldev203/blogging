package com.blogging.springboot.services;

import com.blogging.springboot.configs.AppConstants;
import com.blogging.springboot.configs.AppFunctions;
import com.blogging.springboot.exceptions.BADException;
import com.blogging.springboot.exceptions.NotFoundException;
import com.blogging.springboot.exceptions.UnsupportedFileTypeException;
import com.blogging.springboot.manager.FileFilter;
import com.blogging.springboot.models.Profile;
import com.blogging.springboot.repositories.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
	@Autowired
	private final ProfileRepository profileRepo;
	@Autowired
	private final FileFilter fileFilter;
	@Override
	public Profile setDefaultProfile(String newFilename) {
		try {
			Path sourceImage = Paths.get(AppConstants.DEFAULT_USERS_PICTURE);

			String extension = "." + FilenameUtils.getExtension(sourceImage.toString());

			Path newImage = Files.createFile(Paths.get(AppConstants.DEFAULT_USERS_PATH, newFilename + extension));

			Files.copy(sourceImage, newImage, StandardCopyOption.REPLACE_EXISTING);

			Profile profile = new Profile();
			profile.setNomImg(newImage.getFileName().toString());
			return profileRepo.save(profile);
		}catch (BADException e) {
			throw new BADException("Erreur lors de l'attibution de l'image par defaut");
		} catch (IOException e) {
			throw new BADException("Erreur Systeme: \n" + e);
		}
	}

	@Override
	public Profile saveProfile(MultipartFile image) {
		String nouveauNom = AppFunctions.copyImgToPath(image, AppConstants.DEFAULT_USERS_PATH);
		String extension = getExtension(image.getOriginalFilename());
		String nomHache = generateHashedName(nouveauNom) + "." + extension;
		Profile profile = new Profile();
		profile.setNomImg(nomHache);
		return profileRepo.save(profile);
	}
	private String generateHashedName(String originalName) {
		return DigestUtils.md5DigestAsHex(originalName.getBytes());
	}
	private String getExtension(String filename) {
		return filename.substring(filename.lastIndexOf(".") + 1);
	}

	@Override
	public Profile changeProfileImage(Long id, MultipartFile image) {
		try {
			Profile profile = profileRepo.findById(id).orElseThrow(() -> new NotFoundException("Profile", id));
			Path toDelete = Paths.get(AppConstants.DEFAULT_USERS_PATH, profile.getNomImg());
			if (Files.exists(toDelete))
				Files.delete(toDelete);
			String nouvNom = AppFunctions.copyImgToPath(image, AppConstants.DEFAULT_USERS_PATH);
			profile.setNomImg(nouvNom);
			return profileRepo.save(profile);
		}catch (IOException e){
			throw new BADException("Echec de la modification de l'image");
		}
	}

	@Override
	public ResponseEntity<byte[]> getProfileImage(Long id) {
		Profile article = profileRepo.findById(id).orElseThrow(() -> new NotFoundException("Profile",id));
		String cheminFichierImage = AppConstants.DEFAULT_USERS_PATH + "/" + article.getNomImg();
		return getProfileByName(cheminFichierImage);
	}

	@Override
	public ResponseEntity<byte[]> getProfileByName(String name) {
		try {
			Path cheminVersImages = Paths.get(name);
			byte[] imageBytes = Files.readAllBytes(cheminVersImages);
			String contentType = fileFilter.determineContentType(name);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.parseMediaType(contentType));
			headers.setContentLength(imageBytes.length);
			return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
		} catch (IOException e) {
			// Gestion des exceptions liées à la lecture du fichier
			throw new BADException("Echec. Veillez reessayer");
		} catch (UnsupportedFileTypeException e) {
			// Gestion des exceptions lorsque le type MIME ne peut pas être résolu
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
		}
	}

}
