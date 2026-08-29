# Customizing Website Assets 🎨🎵

This folder is structured to hold all the media resources for your friend's birthday surprise website.

## 🎵 1. Adding Background Music

The website is configured to play a song located at:
`./assets/audio/birthday-song.mp3`

To add your music:
1. Create a folder named `audio` inside this `assets` directory.
2. Put your chosen `.mp3` file in that folder.
3. Rename the file to `birthday-song.mp3`.
4. If you have a different audio file format (like `.wav` or `.ogg`) or want to change the path, you can open [data.js](file:///c:/Users/Dipanshu%20Gupta/Desktop/Birthday%20Site/data.js) and update the `audioPath` property.

> [!NOTE]
> Modern web browsers block audio from playing automatically without user interaction.
> The website is designed to delay playing audio until your friend clicks the "Open Your Surprise" button.

---

## 📸 2. Adding Custom Images

We have configured the website to load beautiful placeholder images from Unsplash. If you want to use real photographs of your friend and your shared memories:
1. Put your image files (JPEG, PNG, WebP) in a new folder under `assets/images/`.
2. Update the file paths in [data.js](file:///c:/Users/Dipanshu%20Gupta/Desktop/Birthday%20Site/data.js).
   For example, update:
   `image: "https://images.unsplash.com/..."`
   to:
   `image: "./assets/images/first_trip.jpg"`
