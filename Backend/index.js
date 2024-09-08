const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath), {
    file: req.file.originalname,
    contentType: req.file.mimetype
  });

  try {
    const response = await axios.post('http://127.0.0.1:8000/predict', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    res.send(response.data);
  } catch (err) {
    console.error('Error in ML model integration:', err);
    res.status(500).send('An error occurred while processing the file.');
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
