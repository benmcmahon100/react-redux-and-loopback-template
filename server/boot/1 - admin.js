const fs = require('fs');
const path = require('path');

const formidable = require('formidable');
const mongoID = require('mongodb').ObjectID;

const uploadFolder = 'uploadStore';
const uploadPath = path.join(__dirname, '..', '..', uploadFolder);

function createForm() {
  let form = new formidable.IncomingForm();
  form.uploadDir = uploadPath;

  form.on('progress', function(bytesReceived, bytesExpected) {
    console.log(
      `${
        bytesReceived}/${bytesExpected
      } -> ${
        bytesReceived / bytesExpected * 100
      }%`
    );
  });

  form.on('error', function(err) {
    console.error('An error has occured: \n' + err);
  });

  form.on('file', function(field, file) {
    if (typeof file.name === 'string' && file.name.length > 0) {
      let fName = file.name.split(/(\.)/gi).filter((w) => {
        return w !== '.';
      });
      let extension = `.${fName.pop()}`;
      fName = fName.map((nChunk) => {
        return nChunk.replace(/\W/gi, '_');
      }).join('.');
      fName = fName + extension;

      const imageName = `${new mongoID()}_${fName}`;
      const newPath = path.join(form.uploadDir, imageName);
      fs.rename(file.path, newPath);
      file.newPath = path.join(imageName);
    }
  });

  return form;
}

function processData(req, cb) {
  let form = createForm();

  form.parse(req, (err, fields, files) => {
    if (!err) {
      let newFiles = [];

      Object.keys(files).forEach((key) => {
        let file = files[key];
        newFiles.push(typeof file.newPath !== 'undefined' ? file.newPath : '');
      });

      fields.files = newFiles;

      cb(fields);
    } else {
      console.error(err);
      cb(null);
    }
  });
}

module.exports = function(app) {
  let router = app.loopback.Router();
  const Media = app.models.Media;
  const AccessToken = app.models.AccessToken;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  function ensureLoggedIn(req, cb) {
    const User = app.models.User;

    if (!req.accessToken) {
      return cb(false);
    }

    return User.findById(req.accessToken.userId, (err, user) => {

      if (err) {
        return cb(false);
      }

      if (!user) {
        // user not found for accessToken, which is odd.
        return cb(false);
      }

      return user.roles({fields: ['id', 'name']}, function(err, roles) {
        if (err) {
          console.error(err);
          return (cb(false));
        }

        return cb(true, {
          user,
          roles
        });
      });
    });
  }

  router.get('/amILoggedIn', (req, res) => {
    ensureLoggedIn(req, (success, data) => {
      if (success) {
        res.json({
          id: data.user.id,
          roles: data.roles
        });
      }
      else {
        res.json(null);
      }
    });
  });

  router.post('/upload', (req, res) => {
    ensureLoggedIn(req, (success) => {
      if (success) {
        processData(req, fields => {
          const files = fields.files;

          Media.create(
            files.map(file => {
              return ({
                name: file,
                path: path.join(uploadPath, file),
                relativePath: `/images/${file}`
              });
            }),
            (err, created) => {
              if (err) {
                console.error(err);
                res.status(500).end();
              }
              else {
                console.log(created);
                res.json(created);
              }
            }
          );
        });
      }
      else {
        res.status(401).send('User was not logged in');
      }
    });
  });

  router.get('/logout', (req, res) => {

    if (req.signedCookies.userid) {
      AccessToken.destroyAll({
        userId: req.signedCookies.userid
      }, (e) => {
        if (e) {
          console.error('Access Token Destruction Error: ', e);
        }
      });
    }

    res.redirect('/');
  });

  router.get('*', (req, res) => {
    res.render('admin');
  });

  app.use('/admin', router);
};
