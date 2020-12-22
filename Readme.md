# Image Uploader application

## Fuctionality

- User story: I can drag and drop an image to upload it
- User story: I can choose to select an image from my folder
- User story: I can see a loader when uploading
- User story: When the image is uploaded, I can see the image and copy it
- User story: I can choose to copy to clipboard

### Live demo:

[Image uploader app live](https://evening-wildwood-04625.herokuapp.com/)

### Select image

![Select image](/screenshots/im1.PNG)

### Upload successfull

![Upload successfull](/screenshots/im2.PNG)

## Technologies

### Backend

- Nodejs
- expressjs, mongoose
- Gridfs, multer (for image uploads)

### Frontend

- Reactjs

## Development

- Add a config folder containing a default.json file with a mongoURI
- Install dependencies `npm install`
- Install client dependencies `npm run clientinstall`
- Run application `npm run dev`
