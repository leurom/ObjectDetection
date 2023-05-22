package ch.zhaw.leurom01.objectdetection;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import ai.djl.modality.cv.output.DetectedObjects;
import ch.zhaw.leurom01.objectdetection.*;

import ai.djl.ModelException;
import ai.djl.translate.TranslateException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class ObjectDetectionController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/")
    public String uploadImage(@RequestParam("file") MultipartFile file, Model model) {
    if (file.isEmpty()) {
        model.addAttribute("message", "Please select a file to upload.");
        return "index";
    }

    // Debugging-Ausgaben hinzufügen
    System.out.println("Received file: " + file.getOriginalFilename());
    System.out.println("File type: " + file.getContentType());
    System.out.println("File size: " + file.getSize() + " bytes");

    try {
        // Speichern des MultipartFile in einer temporären Datei
        Path tempFile = Files.createTempFile("temp", file.getOriginalFilename());
        FileCopyUtils.copy(file.getInputStream(), Files.newOutputStream(tempFile));

        // Aufruf der predict-Methode mit dem Dateinamen als String
        DetectedObjects detections = ObjectDetection.predict(tempFile.toString());

        // Konvertiere DetectedObjects in JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String detectionsJson = objectMapper.writeValueAsString(detections);

        model.addAttribute("detectionsJson", detectionsJson);
        return "index"; // Rückgabe der index.html-Seite
    } catch (IOException | ModelException | TranslateException e) {
        model.addAttribute("message", "Error occurred during object detection: " + e.getMessage());
        return "index";
    }
}
}

