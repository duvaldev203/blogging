package com.blogging.springboot.configs;

import com.blogging.springboot.exceptions.BADException;
import jakarta.xml.bind.DatatypeConverter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class AppFunctions {

	public static String copyImgToPath(MultipartFile image, String path) {
		File repertoire = new File(path);
		if (!repertoire.exists()) {
			boolean repertoireCree = repertoire.mkdirs();
			if (!repertoireCree) {
				throw new BADException("Impossible de créer le répertoire 'pictures'");
			}
		}
		if (image.isEmpty())
			throw new BADException("Veillez selectionner une image");

		String nomFichier = image.getOriginalFilename();
		String extension = FilenameUtils.getExtension(nomFichier);

		// Générer un nom de fichier unique et sécurisé
		byte[] imageBytes = null;
		try {
			imageBytes = image.getBytes();
		} catch (IOException e) {
			e.printStackTrace();
		}
		byte[] hashBytes = null;
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(imageBytes);
			hashBytes = md.digest();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		String hashString = DatatypeConverter.printHexBinary(hashBytes);
		String nouveauNom = hashString + "." + extension;

		File fichierDuServeur = new File(repertoire, nouveauNom);
		try {
			FileUtils.writeByteArrayToFile(fichierDuServeur, image.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return nouveauNom;
	}

}
